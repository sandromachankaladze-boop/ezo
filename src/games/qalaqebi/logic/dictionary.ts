import { QALAQEBI_LETTERS, QALAQEBI_WORDS } from '@/i18n/content/qalaqebi-words';
import { normalize } from '@/utils/georgian';
import { Category, CATEGORY_KEYS } from './categories';

export const LETTERS = QALAQEBI_LETTERS;

// Word lists -> a fast lookup Set per category
export const DICTIONARY = Object.fromEntries(
  CATEGORY_KEYS.map((cat) => [
    cat,
    new Set(QALAQEBI_WORDS[cat].split(',').map(normalize).filter(Boolean)),
  ]),
) as Record<Category, Set<string>>;
