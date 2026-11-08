export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toti-gauna.github.io').replace(/\/$/, '');
// Draft copy (the story is a first version to review with Abigail): kept out of search engines until she approves it.
export const NOINDEX = (process.env.NEXT_PUBLIC_NOINDEX ?? '1') !== '0';

export const absoluteUrl = (path: string) => `${SITE_URL}${BASE_PATH}${path}`;
export const asset = (path: string) => `${BASE_PATH}${path}`;
