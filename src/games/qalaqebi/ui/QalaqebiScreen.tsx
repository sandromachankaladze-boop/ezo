import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TextInputInstance, View } from 'react-native';
import { InkButton } from '@/components/InkButton';
import { NotebookBackground } from '@/components/NotebookBackground';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { getBestScore, setBestScore } from '@/services/storage';
import { colors, fonts } from '@/theme';
import { Category } from '../logic/categories';
import { LETTERS } from '../logic/dictionary';
import { randomLetter, ROUND_SECONDS, RoundResult, scoreRound } from '../logic/scoring';
import { CATEGORIES } from './categoryMeta';
import { Intro } from './Intro';
import { LetterBadge } from './LetterBadge';
import { ResultView } from './ResultView';
import { Timer } from './Timer';

const GAME_ID = 'qalaqebi';
const EMPTY: Record<Category, string> = { city: '', country: '', animal: '', thing: '' };

type Phase = 'intro' | 'playing' | 'result';

export default function QalaqebiScreen() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [letter, setLetter] = useState(LETTERS[0]);
  const [answers, setAnswers] = useState(EMPTY);
  const [secondsLeft, setSecondsLeft] = useState(ROUND_SECONDS);
  const [result, setResult] = useState<RoundResult | null>(null);
  const [best, setBest] = useState(0);
  const [newRecord, setNewRecord] = useState(false);
  const inputs = useRef<(TextInputInstance | null)[]>([]);

  // საუკეთესო შედეგი ტელეფონშივე ინახება
  useEffect(() => {
    getBestScore(GAME_ID).then(setBest);
  }, []);

  // წამზომი
  useEffect(() => {
    if (phase !== 'playing') return;
    if (secondsLeft <= 0) {
      finish();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
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
      setBestScore(GAME_ID, r.total);
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
              <Txt style={{ marginBottom: 12 }}>{t.qalaqebi.hint(letter)}</Txt>

              {CATEGORIES.map((c, i) => {
                const last = i === CATEGORIES.length - 1;
                return (
                  <View key={c.key} style={{ marginBottom: 12 }}>
                    <Txt weight="bold" style={styles.label}>
                      {c.emoji} {c.label}
                    </Txt>
                    <TextInput
                      ref={(el) => {
                        inputs.current[i] = el;
                      }}
                      value={answers[c.key]}
                      onChangeText={(text) => setAnswers((a) => ({ ...a, [c.key]: text }))}
                      placeholder={`${letter}...`}
                      placeholderTextColor={colors.muted}
                      style={styles.input}
                      autoCorrect={false}
                      autoCapitalize="none"
                      returnKeyType={last ? 'done' : 'next'}
                      onSubmitEditing={() => (last ? finish() : inputs.current[i + 1]?.focus())}
                      submitBehavior={last ? 'blurAndSubmit' : 'submit'}
                    />
                  </View>
                );
              })}

              <InkButton title={t.qalaqebi.done} onPress={finish} style={{ marginTop: 12 }} />
            </>
          )}

          {phase === 'result' && result && (
            <ResultView letter={letter} result={result} best={best} newRecord={newRecord} onAgain={start} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </NotebookBackground>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingRight: 48, paddingBottom: 60 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
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
});
