// Helpers for Georgian text.

// Mtavruli capitals (U+1C90-U+1CBF) -> Mkhedruli (U+10D0-U+10FF)
export function toMkhedruli(text: string): string {
  return Array.from(text)
    .map((ch) => {
      const code = ch.codePointAt(0)!;
      if (code >= 0x1c90 && code <= 0x1cbf) return String.fromCodePoint(code - 0x1c90 + 0x10d0);
      return ch;
    })
    .join('');
}

// Clean a word for comparison: strip spaces, hyphens, dots; convert capitals.
export function normalize(word: string): string {
  return toMkhedruli(word.trim()).replace(/[\s\-–—.]/g, '');
}
