import { StyleSheet, View } from 'react-native';
import { InkButton } from '@/components/InkButton';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { colors } from '@/theme';
import { RoundResult, Verdict } from '../logic/scoring';
import { CATEGORIES } from './categoryMeta';
import { LetterBadge } from './LetterBadge';

const VERDICT_COLOR: Record<Verdict, string> = {
  correct: colors.green,
  unknown: colors.orange,
  'wrong-letter': colors.red,
  empty: colors.red,
};

type Props = {
  letter: string;
  result: RoundResult;
  best: number;
  newRecord: boolean;
  onAgain: () => void;
};

// Round result: each answer, points, bonus, record
export function ResultView({ letter, result, best, newRecord, onAgain }: Props) {
  return (
    <>
      <View style={styles.topRow}>
        <LetterBadge letter={letter} />
        <View style={{ alignItems: 'flex-end' }}>
          <Txt weight="black" style={styles.total}>
            {result.total}
          </Txt>
          <Txt style={{ color: colors.muted }}>{t.qalaqebi.points}</Txt>
        </View>
      </View>
      {newRecord && (
        <View style={styles.record}>
          <Txt weight="bold">{t.qalaqebi.newRecord}</Txt>
        </View>
      )}

      {result.fields.map((f) => {
        const cat = CATEGORIES.find((c) => c.key === f.category)!;
        const color = VERDICT_COLOR[f.verdict];
        return (
          <View key={f.category} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Txt style={{ color: colors.muted, fontSize: 14 }}>
                {cat.emoji} {cat.label}
              </Txt>
              <Txt weight="bold" style={{ fontSize: 18, color: colors.ink }}>
                {f.answer || '—'}
              </Txt>
              <Txt style={{ fontSize: 13, color }}>{t.qalaqebi.verdict[f.verdict]}</Txt>
            </View>
            <Txt weight="black" style={[styles.points, { color }]}>
              {f.points > 0 ? `+${f.points}` : '0'}
            </Txt>
          </View>
        );
      })}
      <View style={styles.row}>
        <Txt style={{ flex: 1 }}>{t.qalaqebi.timeBonus}</Txt>
        <Txt weight="black" style={[styles.points, { color: colors.ink }]}>
          +{result.timeBonus}
        </Txt>
      </View>
      <Txt style={{ color: colors.muted, marginVertical: 8 }}>{t.qalaqebi.best(best)}</Txt>

      <InkButton title={t.qalaqebi.again} onPress={onAgain} />
    </>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  total: { fontSize: 44, color: colors.ink, lineHeight: 56 },
  record: { backgroundColor: colors.sticker, padding: 10, borderRadius: 10, marginBottom: 8, alignSelf: 'flex-start' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grid,
  },
  points: { fontSize: 22, minWidth: 48, textAlign: 'right' },
});
