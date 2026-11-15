// ქართული ტექსტის დამხმარე ფუნქციები.

// მთავრული (Ა-Ჿ) -> მხედრული (ა-ჿ)
export function toMkhedruli(text: string): string {
  return Array.from(text)
    .map((ch) => {
      const code = ch.codePointAt(0)!;
      if (code >= 0x1c90 && code <= 0x1cbf) return String.fromCodePoint(code - 0x1c90 + 0x10d0);
      return ch;
    })
    .join('');
}

// სიტყვის "გასუფთავება" შედარებისთვის: ჰარები, დეფისები, წერტილები და მთავრული ასოები.
export function normalize(word: string): string {
  return toMkhedruli(word.trim()).replace(/[\s\-–—.]/g, '');
}
