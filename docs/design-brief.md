# Design brief: "Yard Arcade"

Mockup (clickable, private to the owner): https://claude.ai/artifact/L9AUSL3XjfzYCMuN43GzLm

## Concept
- **The phone is an arcade cabinet** standing in a **Tbilisi-style yard (ეზო) at dusk**.
- Marquee on top (neon „ეზო“ + bulbs), CRT screen in the middle (games and menus live here),
  control deck at the bottom in the thumb zone (joystick, ▲▼, round "back" and "OK"), coin door below.
- The yard frames everything: dusk sky bands, wooden balconies with lit windows, grapevine,
  string lights, chalk drawings and toys on the asphalt.
- The old school notebook lives on only inside paper games, as **neon grid paper**
  (cyan grid on dark purple, pink margin line).

## Visual language
- Thick dark outlines (`#1A0B2E`) and **hard offset shadows** (no blur), Y2K-style windows with
  title bars and ✕, pixel icons drawn on small grids.
- Simple arcade menus: ▶ cursor, big bold names, a highlight box around the selected item.
- Bottom navigation: მთავარი, რეკორდები, გამოწვევა, პარამეტრები.

## Palette (`arcade` in `src/theme/colors.ts`)
Night purple `#1E0B33` / `#2A0F4A` / `#3B1466` / `#4A1760`, magenta `#E0287A`, berry `#8E1450`,
neon orange `#FF8A3D`, yellow `#FFD23F`, green `#4CC94C`, blue `#2D9CDB`, red `#E63946`,
teal `#1FB5A8`, cream `#FFF4E0`, steel `#2B2B33`, CRT glass `#0D0820`.

## Type
- Georgian words: Noto Sans Georgian (700/900 for titles), with neon glow on signs.
- Numbers and short Latin labels (OK, START): Press Start 2P (pixel font).
- Later: a hand-pixelled „ეზო“ logo.

## Rules
- All graphics are original; inspiration images are never copied.
- Keep the yard calm and low-detail so games stay readable and weak phones stay fast.
- Touch targets at least 44 pt. Driver warning: first-launch card + Settings.
