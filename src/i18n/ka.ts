// All Georgian app text in one place.
// Components never hard-code Georgian text; they read it from here: t.home.title etc.

export const ka = {
  common: {
    back: 'უკან',
    soon: 'მალე',
  },
  home: {
    title: 'ეზო',
    subtitle: 'დასვენების თამაშები, ახლა ჯიბეში',
    driverTitle: '🚗 მძღოლო, ეკრანს ნუ უყურებ!',
    driverText:
      'ეს თამაშები მგზავრებისთვისაა. მძღოლებისთვის ხმოვან რეჟიმს ვამზადებთ, ეკრანისა და ხელების გარეშე.',
  },
  games: {
    qalaqebi: { title: 'ქალაქები', desc: 'ქალაქი, ქვეყანა, ცხოველი, ნივთი ერთ ასოზე' },
    battleship: { title: 'საზღვაო ბრძოლა', desc: 'რვეულის უჯრებზე, მეგობართან ერთად' },
    arcade: { title: 'აგურები', desc: 'ძველი ტელეფონის სტილის არკადა' },
  },
  qalaqebi: {
    categories: {
      city: 'ქალაქი',
      country: 'ქვეყანა',
      animal: 'ცხოველი',
      thing: 'ნივთი',
    },
    rules: [
      '1. აპი ერთ ასოს აირჩევს.',
      '2. 60 წამში ჩაწერე ქალაქი, ქვეყანა, ცხოველი და ნივთი, რომლებიც ამ ასოზე იწყება.',
      '3. სწორი სიტყვა 10 ქულაა, ჩქარ მოთამაშეს დროის ბონუსი ემატება.',
    ],
    yourRecord: (n: number) => `🏆 შენი რეკორდი: ${n}`,
    start: 'დავიწყოთ!',
    hint: (letter: string) => `ყველა სიტყვა დაიწყე ასოთი „${letter}“`,
    done: 'მზად ვარ! ✋',
    seconds: 'წამი',
    points: 'ქულა',
    newRecord: '🏆 ახალი რეკორდი!',
    timeBonus: '⏱️ დროის ბონუსი',
    best: (n: number) => `საუკეთესო შედეგი: ${n}`,
    again: 'კიდევ ერთი ასო 🔁',
    verdict: {
      correct: '✔ სწორია',
      unknown: '? ლექსიკონში ვერ ვიპოვე, ნახევარი ქულა',
      'wrong-letter': '✘ სხვა ასოზე იწყება',
      empty: '✘ ცარიელია',
    },
  },
};
