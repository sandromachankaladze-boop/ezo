import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TextInputInstance, View } from 'react-native';
import { InkButton } from '@/components/InkButton';
import { NotebookBackground } from '@/components/NotebookBackground';
import { Txt } from '@/components/Txt';
import { ROUND_SECONDS, scoreRound, randomLetter, Verdict } from '@/games/qalaqebi/logic';
import { CATEGORIES, Category } from '@/games/qalaqebi/words';
import { colors, fonts } from '@/theme';

const BEST_KEY = 'qalaqebi.best';
const EMPTY: Record<Category, string> = { city: '', country: '', animal: '', thing: '' };

type Phase = 'intro' | 'playing' | 'result';

export default function Qalaqebi() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [letter, setLetter] = useState('ა');
  const [answers, setAnswers] = useState(EMPTY);
  const [secondsLeft, setSecondsLeft] = useState(ROUND_SECONDS);
  const [result, setResult] = useState<ReturnType<typeof scoreRound> | null>(null);
  const [best, setBest] = useState(0);
  const [newRecord, setNewRecord] = useState(false);
  const inputs = useRef<(TextInputInstance | null)[]>([]);

  // საუკეთესო შედეგი ტელეფონშივე ინახება
  useEffect(() => {
    AsyncStorage.getItem(BEST_KEY).then((v) => v && setBest(Number(v)));
  }, []);

  // წამზომი
  useEffect(() => {
    if (phase !== 'playing') return;
    if (secondsLeft <= 0) {
      finish();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // finish ყოველ წამს ახლდება, ამიტომ dependency-ში არ გვჭირდება
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secondsLeft]);

  function start() {
    setLetter((prev) => randomLetter(prev));
    setAnswers(EMPTY);
    setSecondsLeft(ROUND_SECONDS);
    setResult(null);
    setNewRecord(false);
    setPhase('playing');
    setTimeout(() => inputs.current[0]?.focus(), 300);
  }

  function finish() {
    const r = scoreRound(letter, answers, Math.max(0, secondsLeft));
    setResult(r);
    setPhase('result');
    if (r.total > best) {
      setBest(r.total);
      setNewRecord(true);
      AsyncStorage.setItem(BEST_KEY, String(r.total));
    }
  }

  return (
    <NotebookBackground>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {phase === 'intro' && <Intro best={best} onStart={start} />}

          {phase === 'playing' && (
            <>
              <View style={styles.topRow}>
                <LetterBadge letter={letter} />
                <Timer seconds={secondsLeft} />
              </View>
              <Txt style={styles.hint}>
                ყველა სიტყვა დაიწყე ასოთი „{letter}“
              </Txt>

              {CATEGORIES.map((c, i) => (
                <View key={c.key} style={styles.field}>
                  <Txt weight="bold" style={styles.label}>
                    {c.emoji} {c.label}
                  </Txt>
                  <TextInput
                    ref={(el) => {
                      inputs.current[i] = el;
                    }}
                    value={answers[c.key]}
                    onChangeText={(t) => setAnswers((a) => ({ ...a, [c.key]: t }))}
                    placeholder={`${letter}...`}
                    placeholderTextColor={colors.muted}
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType={i === CATEGORIES.length - 1 ? 'done' : 'next'}
                    onSubmitEditing={() =>
                      i === CATEGORIES.length - 1 ? finish() : inputs.current[i + 1]?.focus()
                    }
                    submitBehavior={i === CATEGORIES.length - 1 ? 'blurAndSubmit' : 'submit'}
                  />
                </View>
              ))}

              <InkButton title="მზად ვარ! ✋" onPress={finish} style={{ marginTop: 12 }} />
            </>
          )}

          {phase === 'result' && result && (
            <>
              <View style={styles.topRow}>
                <LetterBadge letter={letter} />
                <View style={{ alignItems: 'flex-end' }}>
                  <Txt weight="black" style={styles.total}>
                    {result.total}
                  </Txt>
                  <Txt style={{ color: colors.muted }}>ქულა</Txt>
                </View>
              </View>
              {newRecord && (
                <View style={styles.record}>
                  <Txt weight="bold">🏆 ახალი რეკორდი!</Txt>
                </View>
              )}

              {result.fields.map((f) => {
                const cat = CATEGORIES.find((c) => c.key === f.category)!;
                return (
                  <View key={f.category} style={styles.resultRow}>
                    <View style={{ flex: 1 }}>
                      <Txt style={{ color: colors.muted, fontSize: 14 }}>
                        {cat.emoji} {cat.label}
                      </Txt>
                      <Txt weight="bold" style={{ fontSize: 18, color: colors.ink }}>
                        {f.answer || '—'}
                      </Txt>
                      <Txt style={{ fontSize: 13, color: VERDICT[f.verdict].color }}>{VERDICT[f.verdict].text}</Txt>
                    </View>
                    <Txt weight="black" style={[styles.points, { color: VERDICT[f.verdict].color }]}>
                      {f.points > 0 ? `+${f.points}` : '0'}
                    </Txt>
                  </View>
                );
              })}
              <View style={styles.resultRow}>
                <Txt style={{ flex: 1 }}>⏱️ დროის ბონუსი</Txt>
                <Txt weight="black" style={[styles.points, { color: colors.ink }]}>
                  +{result.timeBonus}
                </Txt>
              </View>
              <Txt style={{ color: colors.muted, marginVertical: 8 }}>საუკეთესო შედეგი: {best}</Txt>

              <InkButton title="კიდევ ერთი ასო 🔁" onPress={start} />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </NotebookBackground>
  );
}

const VERDICT: Record<Verdict, { text: string; color: string }> = {
  correct: { text: '✔ სწორია', color: colors.green },
  unknown: { text: '? ლექსიკონში ვერ ვიპოვე, ნახევარი ქულა', color: colors.orange },
  'wrong-letter': { text: '✘ სხვა ასოზე იწყება', color: colors.red },
  empty: { text: '✘ ცარიელია', color: colors.red },
};

function Intro({ best, onStart }: { best: number; onStart: () => void }) {
  return (
    <>
      <Txt weight="black" style={{ fontSize: 32, color: colors.ink, lineHeight: 44 }}>
        ქალაქები
      </Txt>
      <View style={styles.rules}>
        <Txt style={styles.rule}>1. აპი ერთ ასოს აირჩევს.</Txt>
        <Txt style={styles.rule}>2. 60 წამში ჩაწერე ქალაქი, ქვეყანა, ცხოველი და ნივთი, რომლებიც ამ ასოზე იწყება.</Txt>
        <Txt style={styles.rule}>3. სწორი სიტყვა 10 ქულაა, ჩქარ მოთამაშეს დროის ბონუსი ემატება.</Txt>
      </View>
      {best > 0 && <Txt style={{ marginBottom: 12 }}>🏆 შენი რეკორდი: {best}</Txt>}
      <InkButton title="დავიწყოთ!" onPress={onStart} />
    </>
  );
}

function LetterBadge({ letter }: { letter: string }) {
  return (
    <View style={styles.letterBox}>
      <Txt weight="black" style={styles.letter}>
        {letter}
      </Txt>
    </View>
  );
}

function Timer({ seconds }: { seconds: number }) {
  const danger = seconds <= 10;
  return (
    <View style={{ alignItems: 'flex-end' }}>
      <Txt weight="black" style={[styles.timer, danger && { color: colors.red }]}>
        {seconds}
      </Txt>
      <Txt style={{ color: colors.muted }}>წამი</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingRight: 48, paddingBottom: 60 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  letterBox: {
    width: 88,
    height: 88,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: colors.red,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-4deg' }],
  },
  letter: { fontSize: 52, color: colors.red, lineHeight: 70 },
  timer: { fontSize: 44, color: colors.ink, lineHeight: 56 },
  total: { fontSize: 44, color: colors.ink, lineHeight: 56 },
  hint: { marginBottom: 12 },
  field: { marginBottom: 12 },
  label: { marginBottom: 4, color: colors.ink },
  input: {
    fontFamily: fonts.regular,
    fontSize: 20,
    color: colors.pencil,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.grid,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: 52,
  },
  rules: { marginVertical: 16, gap: 8 },
  rule: { fontSize: 16, lineHeight: 24 },
  record: { backgroundColor: colors.sticker, padding: 10, borderRadius: 10, marginBottom: 8, alignSelf: 'flex-start' },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grid,
  },
  points: { fontSize: 22, minWidth: 48, textAlign: 'right' },
});
