// "ქალაქების" კატეგორიები. სახელები (ქართულად) src/i18n/ka.ts-შია.
export const CATEGORY_KEYS = ['city', 'country', 'animal', 'thing'] as const;
export type Category = (typeof CATEGORY_KEYS)[number];
