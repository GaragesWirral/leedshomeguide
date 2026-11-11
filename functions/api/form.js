// Cloudflare Pages Function: POST /api/form
// Takes the get listed and contact forms, drops spam (honeypot), checks the fields, and emails them on
// through FormSubmit (https://formsubmit.co, free). The destination address is the FORM_TO variable in the
// Pages project settings, so it never appears in the site's HTML or in this repo.
const SITE = 'https://leedshomeguide.co.uk';
const FIELDS = {
  listing: [['business', 'Business name', true], ['trade', 'Trade', true], ['name', 'Contact name', true], ['phone', 'Phone', true], ['email', 'Email', true], ['website', 'Website', false], ['area', 'Area of Leeds', true], ['message', 'Message', false]],
  contact: [['name', 'Name', true], ['email', 'Email', true], ['message', 'Message', true]],
};
const PAGES = { listing: '/get-listed/', contact: '/contact/' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function respond(request, kind, ok, error, status) {
  const json = (request.headers.get('accept') || '').includes('application/json');
  if (json) return new Response(JSON.stringify(ok ? { ok: true } : { ok: false, error, fallback: status === 502 }), { status: ok ? 200 : status || 400, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
  if (ok) return Response.redirect(`${SITE}${PAGES[kind]}thanks/`, 303);
  const back = PAGES[kind] || '/contact/';
  const html = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Not sent | Leeds Home Guide</title></head><body style="font-family:system-ui,sans-serif;max-width:560px;margin:48px auto;padding:0 20px;line-height:1.5"><h1>Sorry, that did not send</h1><p>${error}</p><p><a href="${back}">Go back to the form</a></p></body></html>`;
  return new Response(html, { status: status || 400, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
}

export async function onRequestPost({ request, env }) {
  let fd;
  try { fd = await request.formData(); } catch { return respond(request, 'contact', false, 'Please use the form on our site.'); }
  const get = (k) => String(fd.get(k) || '').replace(/\s+/g, ' ').trim().slice(0, k === 'message' ? 3000 : 200);
  const kind = get('form') === 'listing' ? 'listing' : 'contact';
  // Honeypot: real people never see this field. Bots that fill it get a normal looking success.
  if (get('company_fax')) return respond(request, kind, true);
  const data = {};
  for (const [k, label, req] of FIELDS[kind]) {
    const v = k === 'message' ? String(fd.get(k) || '').trim().slice(0, 3000) : get(k);
    if (req && !v) return respond(request, kind, false, `Please fill in ${label.toLowerCase()}.`);
    data[label] = v || '(not given)';
  }
  if (!EMAIL_RE.test(get('email'))) return respond(request, kind, false, 'Please check your email address.');
  if (get('consent') !== 'yes') return respond(request, kind, false, 'Please tick the consent box so we can use your details.');
  const links = (data['Message'] || '').match(/https?:\/\//g) || [];
  if (links.length > 3) return respond(request, kind, false, 'Please remove some of the links from your message.');
  if (!env.FORM_TO) return respond(request, kind, false, 'Our form is not set up yet. Please email hello@leedshomeguide.co.uk.', 503);

  const subject = kind === 'listing' ? `Listing request: ${data['Business name']} (${data['Trade']})` : `Contact form: ${data['Name']}`;
  const payload = { _subject: subject, _template: 'table', _captcha: 'false', _replyto: get('email'), Form: kind === 'listing' ? 'Get listed' : 'Contact', ...data, Consent: 'Yes, ticked', Sent: new Date().toISOString() };
  let ok = false, why = '';
  try {
    const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(env.FORM_TO)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json', origin: SITE, referer: `${SITE}${PAGES[kind]}` },
      body: JSON.stringify(payload),
    });
    const body = await r.text();
    let j = {};
    try { j = JSON.parse(body); } catch {}
    ok = r.ok && (j.success === true || j.success === 'true');
    why = j.message || `status ${r.status} ${body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 160)}`;
  } catch (e) { why = String(e); }
  if (!ok) {
    console.log('form send failed:', why);
    const res = respond(request, kind, false, 'Sorry, that did not send. Please try again later, or email hello@leedshomeguide.co.uk.', 502);
    res.headers.set('x-form-reason', /activat/i.test(why) ? 'needs_activation' : 'upstream');
    if (new URL(request.url).hostname.endsWith('.pages.dev')) res.headers.set('x-form-why', String(why).replace(/[^\x20-\x7e]/g, '').slice(0, 300));
    return res;
  }
  return respond(request, kind, true);
}

export async function onRequest({ request }) {
  if (request.method === 'POST') return onRequestPost(arguments[0]);
  return new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
}
