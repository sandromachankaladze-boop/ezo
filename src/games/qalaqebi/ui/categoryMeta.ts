import { t } from '@/i18n';
import { arcade } from '@/theme';
import { Category, CATEGORY_KEYS } from '../logic/categories';

const EMOJI: Record<Category, string> = { city: '🏙️', country: '🌍', animal: '🐾', thing: '🎒' };
const COLOR: Record<Category, string> = { city: arcade.yellow, country: arcade.teal, animal: arcade.orange, thing: arcade.crtText };

// Categories for the UI: key + emoji + neon colour + Georgian label
export const CATEGORIES = CATEGORY_KEYS.map((key) => ({
  key,
  emoji: EMOJI[key],
  color: COLOR[key],
  label: t.qalaqebi.categories[key],
}));
