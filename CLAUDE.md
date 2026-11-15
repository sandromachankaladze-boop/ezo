# ეზო: ბავშვობის თამაშები ქართველი ჯენზისთვის

პროდუქტის გეგმა: @PLAN.md
Expo-ს ზოგადი წესები და ბრძანებები: @AGENTS.md
მიღებული გადაწყვეტილებები: docs/decisions.md

## ტექნოლოგია
React Native + Expo (SDK 58), Expo Router, TypeScript. ოფლაინ რეჟიმი სავალდებულოა.

## საქაღალდეები

```
src/
  app/                  Expo Router მარშრუტები. მხოლოდ მოკლე ფაილები, რომლებიც ეკრანს აბრუნებს
    _layout.tsx         ფონტების ჩატვირთვა + ნავიგაციის Stack
    index.tsx           "/"         -> screens/HomeScreen
    qalaqebi.tsx        "/qalaqebi" -> games/qalaqebi/ui/QalaqebiScreen
  navigation/           routes.ts (მისამართები), stackOptions.ts (header-ის სტილი)
  screens/              არა-სათამაშო ეკრანები (HomeScreen.tsx)
  games/
    <თამაში>/           ერთი საქაღალდე თითო თამაშზე
      logic/            წესები და ქულები, React/UI-ს გარეშე
      ui/               ეკრანი და მისი ნაწილები
    qalaqebi/           "ქალაქები" (სახელი ყველგან ასე: საქაღალდე, მარშრუტი, ფაილები, შენახვის გასაღები)
  components/           საერთო UI: Txt, InkButton, NotebookBackground
  services/             შენახვა (storage.ts), მომავალში ბექენდი, რეკლამა
  i18n/
    ka.ts               აპის მთელი ქართული ტექსტი (t.home.title, t.qalaqebi.start ...)
    content/            სათამაშო კონტენტი: სიტყვების სიები (qalaqebi-words.ts)
  theme/                colors.ts, fonts.ts, CELL (უჯრის ზომა)
  utils/                ზოგადი ფუნქციები (georgian.ts: normalize, მთავრული -> მხედრული)
assets/                 აიკონები, სურათები (ჯერ Expo-ს შაბლონისაა, შესაცვლელია)
docs/decisions.md       გადაწყვეტილებების ჟურნალი
```

## წესები
- **ერთი ეკრანი, ერთი ფაილი.** `src/app/`-ის ფაილი მხოლოდ ეკრანს ახსენებს, კოდი `screens/`-ში ან `games/<თამაში>/ui/`-შია.
- **ერთი საქაღალდე თითო თამაშზე**, სადაც `logic/` (წესები, ქულები) `ui/`-ისგან გამოყოფილია. `logic/` React-ს არ იყენებს.
- **ქართული ტექსტი და სიტყვების სიები კომპონენტებში პირდაპირ არ იწერება.** ტექსტი `src/i18n/ka.ts`-შია, სიტყვები და კონტენტი `src/i18n/content/`-ში. კომენტარები ქართულად შეიძლება.
- ფერები და ფონტები მხოლოდ `@/theme`-დან.
- მონაცემების შენახვა მხოლოდ `src/services/`-ით, AsyncStorage-ს პირდაპირ ეკრანიდან არ ვიყენებთ.
- ახალი მარშრუტი: ფაილი `src/app/`-ში + მისამართი `src/navigation/routes.ts`-ში.
- იმპორტები `@/...` ალიასით (= `src/`).

## მუშაობის წესი
- ერთ ჯერზე ერთი პატარა ამოცანა. ყოველი ნაბიჯის შემდეგ: `npx tsc --noEmit`, `npx expo lint` და აპის გაშვება.
- ახსნა მარტივად, ქართულად. მნიშვნელოვანი ტექნიკური არჩევანის წინ 2-3 ვარიანტის შეთავაზება.
- მნიშვნელოვანი გადაწყვეტილება ჩაიწერება `docs/decisions.md`-ში თარიღით.
- ამ გარემოში `npx expo install` ქსელის გამო არ მუშაობს. ვერსიას ვიღებთ
  `node_modules/expo/bundledNativeModules.json`-დან და ვაყენებთ `npm install <პაკეტი>@<ვერსია>`-ით.
