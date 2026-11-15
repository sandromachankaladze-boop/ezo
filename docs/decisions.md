# Decisions

Newest entry first: date, what we decided, why.

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
