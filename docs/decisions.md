# Decisions

Newest entry first: date, what we decided, why.

## 2026-11-15: Visual direction "Yard Arcade"
**Decision:** the app looks like an arcade cabinet standing in a Tbilisi yard at dusk
(details in `docs/design-brief.md`). Fonts: Noto Sans Georgian for words, Press Start 2P
for numbers. The notebook style survives only as neon grid paper inside paper games.
The Cities game is shown to players as „ქალაქობანა“ (code name stays `qalaqebi`).
Screens move to the new style one at a time; the home screen is first.

**Why:** chosen by the owner from a clickable mockup; combines arcade nostalgia with the
meaning of „ეზო“ (the shared yard of childhood).

## 2026-11-15: Coin economy: "pocket money" (option C)
**Options considered:**
- A: every round costs a coin.
- B: games are free and coins buy extras.
- C: daily free "pocket money", then rounds cost coins, and coins also buy extras.

**Decision:** C, "pocket money" („ჯიბის ფული“).
- Every day the player gets free coins (pocket money). A round costs 1 coin.
- Coins are earned by playing (score, wins, records, daily streak) and by watching a rewarded ad.
- Coins are also spent on extras: in-game help (more time, new letter) and yard items
  (toys and chalk drawings that appear in the lobby), plus cosmetics.
- No random loot boxes. Coins are stored on the phone and work offline.
- Exact numbers are still to be tuned (see the proposal in chat; to be confirmed).

**Why:** strongest nostalgic story (grandma's pocket money, the arcade coin slot) and more
ad value than "always free", while the daily allowance keeps the game playable offline.

**Risk to watch:** too stingy and players leave. Players with no coins and no internet
(no ads) must still have a way to play.

## 2026-11-15: Driver warning placement
**Decision:** the warning is removed from the main screens (replaced by bottom navigation).
It is shown once as a card on first launch, and permanently in Settings.

**Why:** keeps the screens clean while still meeting the plan's safety requirement.

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
