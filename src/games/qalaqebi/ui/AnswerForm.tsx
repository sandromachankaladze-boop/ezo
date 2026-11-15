import { useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TextInputInstance, View } from 'react-native';
import { InkButton } from '@/components/InkButton';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { colors, fonts } from '@/theme';
import { Category } from '../logic/categories';
import { CATEGORIES } from './categoryMeta';
import { LetterBadge } from './LetterBadge';
import { Timer } from './Timer';

type Props = {
  letter: string;
  secondsLeft: number;
  answers: Record<Category, string>;
  onChange: (category: Category, text: string) => void;
  onDone: () => void;
  playerLabel?: string; // shown in 2-player mode
};

// One player's turn: the letter, the timer and four answer fields.
export function AnswerForm({ letter, secondsLeft, answers, onChange, onDone, playerLabel }: Props) {
  const inputs = useRef<(TextInputInstance | null)[]>([]);

  // Put the cursor in the first field when the turn starts
  useEffect(() => {
    const timer = setTimeout(() => inputs.current[0]?.focus(), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {playerLabel && (
        <Txt weight="bold" style={styles.player}>
          {playerLabel}
        </Txt>
      )}
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
              onChangeText={(text) => onChange(c.key, text)}
              placeholder={`${letter}...`}
              placeholderTextColor={colors.muted}
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType={last ? 'done' : 'next'}
              onSubmitEditing={() => (last ? onDone() : inputs.current[i + 1]?.focus())}
              submitBehavior={last ? 'blurAndSubmit' : 'submit'}
            />
          </View>
        );
      })}

      <InkButton title={t.qalaqebi.done} onPress={onDone} style={{ marginTop: 12 }} />
    </>
  );
}

const styles = StyleSheet.create({
  player: {
    alignSelf: 'flex-start',
    backgroundColor: colors.sticker,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
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
