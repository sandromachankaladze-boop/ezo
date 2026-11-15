# Ezo: childhood games for Georgian Gen Z

Product plan: @PLAN.md
General Expo rules and commands: @AGENTS.md
Decisions log: docs/decisions.md

## Tech
React Native + Expo (SDK 58), Expo Router, TypeScript. Offline mode is required.

## Folder layout

```
src/
  app/                  Expo Router routes. Thin files only: each re-exports a screen
    _layout.tsx         font loading + navigation Stack
    index.tsx           "/"         -> screens/HomeScreen
    qalaqebi.tsx        "/qalaqebi" -> games/qalaqebi/ui/QalaqebiScreen
  navigation/           routes.ts (paths), stackOptions.ts (header style)
  screens/              non-game screens (HomeScreen.tsx)
  games/
    <game>/             one folder per game
      logic/            rules and scoring, no React/UI
      ui/               the screen and its parts
    qalaqebi/           Cities game (always named "qalaqebi": folder, route, files, storage key)
  components/           shared UI: Txt (text with the Georgian font)
    arcade/             "Yard Arcade" pieces: ArcadeShell (standard game screen), YardBackground,
                        Marquee, CompactMarquee, CrtScreen, ControlDeck, CoinDoor, BottomNav,
                        ArcadeWindow, PixelButton, NeonLetter, PixelIcon, SafetyCard, Patterns,
                        CoinCounter, PocketMoneyCard, InsertCoin, CoinRewardWindow
  economy/              coin rules (rules.ts): pocket money, round cost, rewards, credit. No React
  hooks/                React hooks (useWallet: live coin balance)
  services/             storage.ts (records, flags), wallet.ts (coins on the phone); later backend, ads
  i18n/
    ka.ts               all Georgian UI text (t.home.title, t.qalaqebi.start ...)
    content/            game content: word lists (qalaqebi-words.ts)
  theme/                colors.ts (`arcade` palette), fonts.ts (Georgian + pixel font)
  utils/                general helpers (georgian.ts: normalize, Mtavruli -> Mkhedruli)
assets/                 icons, images (still the Expo template ones, to be replaced)
docs/decisions.md       decisions log
docs/design-brief.md    visual direction ("Yard Arcade") + mockup link
```

## Code rules
- **One screen per file.** A file in `src/app/` only re-exports a screen; the code lives in `screens/` or `games/<game>/ui/`.
- **One folder per game**, with `logic/` (rules, scoring) separate from `ui/`. `logic/` does not import React.
- **No hard-coded Georgian text or word lists in components.** UI text goes in `src/i18n/ka.ts`, words and content in `src/i18n/content/`.
- Colors and fonts only from `@/theme`. New game screens use `ArcadeShell` (see docs/design-brief.md).
- Data is saved only through `src/services/`; screens never use AsyncStorage directly.
- Coins change only through `src/services/wallet.ts`; the numbers live in `src/economy/rules.ts`.
- New route: a file in `src/app/` + its path in `src/navigation/routes.ts`.
- Imports use the `@/...` alias (= `src/`).

## Working rules
- Always communicate in English. Georgian is used only for app content.
- File names, folder names, commit messages, code comments and docs are in English.
- One small task at a time. After each step: `npx tsc --noEmit`, `npx expo lint`, and run the app.
- Explain simply; the owner has little programming experience. Offer 2-3 options before any important technical choice.
- Record important decisions in `docs/decisions.md` with the date.
- In this environment `npx expo install` fails (network). Take the version from
  `node_modules/expo/bundledNativeModules.json` and run `npm install <package>@<version>`.
