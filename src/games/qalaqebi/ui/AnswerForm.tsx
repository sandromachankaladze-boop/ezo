import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputInstance, View } from 'react-native';
import { ArcadeWindow } from '@/components/arcade/ArcadeWindow';
import { NeonLetter } from '@/components/arcade/NeonLetter';
import { GridPaper } from '@/components/arcade/Patterns';
import { PixelButton } from '@/components/arcade/PixelButton';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { arcade, fonts } from '@/theme';
import { Category } from '../logic/categories';
import { CATEGORIES } from './categoryMeta';
import { TimerBar } from './Timer';

type Props = {
  letter: string;
  secondsLeft: number;
  answers: Record<Category, string>;
  onChange: (category: Category, text: string) => void;
  onDone: () => void;
  playerLabel?: string; // shown in 2-player mode
};

// One player's turn: neon letter, pixel timer and the neon notebook with four answer fields.
export function AnswerForm({ letter, secondsLeft, answers, onChange, onDone, playerLabel }: Props) {
  const inputs = useRef<(TextInputInstance | null)[]>([]);
  const [focused, setFocused] = useState<number | null>(null);

  // Put the cursor in the first field when the turn starts
  useEffect(() => {
    const timer = setTimeout(() => inputs.current[0]?.focus(), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {playerLabel && (
        <View style={styles.player}>
          <Txt weight="black" style={styles.playerText}>
            {playerLabel}
          </Txt>
        </View>
      )}
      <View style={styles.topRow}>
        <NeonLetter letter={letter} />
        <TimerBar seconds={secondsLeft} />
      </View>

      <ArcadeWindow title={t.qalaqebi.notebook(letter)} barColor={arcade.magenta} bodyColor="transparent">
        <GridPaper />
        <View style={styles.margin} />
        <View style={styles.fields}>
          {CATEGORIES.map((c, i) => {
            const last = i === CATEGORIES.length - 1;
            return (
              <View key={c.key} style={{ gap: 4 }}>
                <Txt weight="black" style={[styles.label, { color: c.color }]}>
                  {c.label}
                </Txt>
                <TextInput
                  ref={(el) => {
                    inputs.current[i] = el;
                  }}
                  accessibilityLabel={c.label}
                  value={answers[c.key]}
                  onChangeText={(text) => onChange(c.key, text)}
                  onFocus={() => setFocused(i)}
                  onBlur={() => setFocused((f) => (f === i ? null : f))}
                  placeholder={`${letter}...`}
                  placeholderTextColor="#6F5D8F"
                  style={[styles.input, focused === i && styles.inputFocused]}
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType={last ? 'done' : 'next'}
                  onSubmitEditing={() => (last ? onDone() : inputs.current[i + 1]?.focus())}
                  submitBehavior={last ? 'blurAndSubmit' : 'submit'}
                />
              </View>
            );
          })}
        </View>
      </ArcadeWindow>

      <PixelButton title={t.qalaqebi.done} onPress={onDone} />
    </>
  );
}

const styles = StyleSheet.create({
  player: {
    alignSelf: 'flex-start',
    backgroundColor: arcade.yellow,
    borderWidth: 2,
    borderColor: arcade.ink,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  playerText: { fontSize: 13, color: arcade.ink },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  margin: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 16,
    width: 2,
    backgroundColor: arcade.magenta,
  },
  fields: { gap: 12, paddingVertical: 4, paddingRight: 24 },
  label: { fontSize: 13 },
  input: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: arcade.cream,
    backgroundColor: 'rgba(13,8,32,0.75)',
    borderBottomWidth: 3,
    borderBottomColor: arcade.teal,
    paddingHorizontal: 8,
    height: 44,
  },
  inputFocused: { borderBottomColor: arcade.yellow },
});
