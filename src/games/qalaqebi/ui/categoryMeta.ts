import { t } from '@/i18n';
import { Category, CATEGORY_KEYS } from '../logic/categories';

const EMOJI: Record<Category, string> = { city: '🏙️', country: '🌍', animal: '🐾', thing: '🎒' };

// Categories for the UI: key + emoji + Georgian label
export const CATEGORIES = CATEGORY_KEYS.map((key) => ({
  key,
  emoji: EMOJI[key],
  label: t.qalaqebi.categories[key],
}));
