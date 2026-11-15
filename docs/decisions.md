# Decisions

Newest entry first: date, what we decided, why.

## 2026-11-15: "qalaqebi" 2-player mode
**Decision:**
- Pass-and-play on one phone: same letter for both, Player 1 plays 60 s, a hand-off
  screen hides the answers, then Player 2 plays 60 s with empty fields.
- Classic yard rule: a word both players wrote gets half points for each (rounded up).
- Each player's time bonus works as in solo mode. The saved record counts solo games only.

**Why:** the plan asks for 1-2 players; one phone needs no internet or accounts,
which fits the metro use case. Online challenges come later with the sharing feature.

## 2026-11-15: Folder structure
**Decision:**
- `src/screens`, `src/games/<game>/{logic,ui}`, `src/components`, `src/navigation`,
  `src/services`, `src/i18n`, `src/theme`, `src/utils`, `assets`.
- `src/app/` stays because Expo Router only looks for routes there. It contains only
  thin files that re-export a screen from `screens/` or `games/`.
- `src/navigation/` holds route paths and the header style.
- Georgian UI text lives in `src/i18n/ka.ts`, word lists in `src/i18n/content/`.
- The Cities game is named `qalaqebi` everywhere.

**Why:** one folder per game means adding a game never touches another one. Keeping
logic apart from UI makes it easy to test. All text in one place means it can be
corrected without knowing the code.

## 2026-11-15: Framework: React Native + Expo
**Options considered:** React Native + Expo, Flutter.

**Decision:** React Native + Expo (SDK 58, Expo Router, TypeScript).

**Why:**
- The app opens on a phone through Expo Go by scanning a QR code; no Android Studio needed. This matters most for a beginner.
- EAS builds the APK in the cloud.
- JavaScript/TypeScript is widespread, so finding a helper developer is easy.
- React Native is fast enough for our games (words, grids, a simple arcade).

**Trade-off:** Flutter is slightly smoother graphically on weak phones and has a ready
arcade engine (Flame).
