// Cities game categories. Georgian labels live in src/i18n/ka.ts.
export const CATEGORY_KEYS = ['city', 'country', 'animal', 'thing'] as const;
export type Category = (typeof CATEGORY_KEYS)[number];
