// One place for site wide settings.
// CONTACT_EMAIL: planned address on the planned domain. When leedshomeguide.co.uk is bought,
// set this up as a forwarding address (see README). Change it here and every page updates.
export const SITE_NAME = 'Leeds Home Guide';
export const CONTACT_EMAIL = 'hello@leedshomeguide.co.uk';
// FORM_ALIAS: FormSubmit's random string for the form inbox (sent by FormSubmit after the Activate Form click).
// Empty = forms send only through /api/form (the address stays in the Cloudflare Pages setting FORM_TO).
// Set = if /api/form cannot reach FormSubmit, the browser sends the same fields straight to formsubmit.co/ajax/<alias>.
export const FORM_ALIAS = '';
