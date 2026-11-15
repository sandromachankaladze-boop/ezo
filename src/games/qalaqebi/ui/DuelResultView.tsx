import { StyleSheet, View } from 'react-native';
import { InkButton } from '@/components/InkButton';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { colors } from '@/theme';
import { DuelResult } from '../logic/duel';
import { FieldResult, Verdict } from '../logic/scoring';
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
  result: DuelResult;
  onRematch: () => void;
  onSolo: () => void;
};

// 2-player result: both players' answers side by side, totals and the winner.
export function DuelResultView({ letter, result, onRematch, onSolo }: Props) {
  const [p1, p2] = result.players;
  const banner = result.winner === 'tie' ? t.qalaqebi.tie : t.qalaqebi.winner(result.winner + 1);

  return (
    <>
      <View style={styles.topRow}>
        <LetterBadge letter={letter} />
        <View style={styles.banner}>
          <Txt weight="black" style={{ fontSize: 18, color: colors.ink }}>
            {banner}
          </Txt>
        </View>
      </View>

      <View style={styles.headRow}>
        <Txt weight="bold" style={styles.col}>
          {t.qalaqebi.player(1)}
        </Txt>
        <Txt weight="bold" style={styles.col}>
          {t.qalaqebi.player(2)}
        </Txt>
      </View>

      {CATEGORIES.map((cat, i) => (
        <View key={cat.key} style={styles.block}>
          <Txt style={{ color: colors.muted, fontSize: 14 }}>
            {cat.emoji} {cat.label}
          </Txt>
          <View style={styles.row}>
            <Cell field={p1.fields[i]} />
            <Cell field={p2.fields[i]} />
          </View>
        </View>
      ))}

      <View style={styles.block}>
        <Txt style={{ color: colors.muted, fontSize: 14 }}>{t.qalaqebi.timeBonus}</Txt>
        <View style={styles.row}>
          <Txt weight="bold" style={styles.col}>+{p1.timeBonus}</Txt>
          <Txt weight="bold" style={styles.col}>+{p2.timeBonus}</Txt>
        </View>
      </View>

      <View style={[styles.row, { marginVertical: 12 }]}>
        <Total label={t.qalaqebi.total} value={p1.total} win={result.winner === 0} />
        <Total label={t.qalaqebi.total} value={p2.total} win={result.winner === 1} />
      </View>

      <View style={{ gap: 12 }}>
        <InkButton title={t.qalaqebi.rematch} onPress={onRematch} />
        <InkButton title={t.qalaqebi.toSolo} onPress={onSolo} variant="outline" />
      </View>
    </>
  );
}

function Cell({ field }: { field: FieldResult }) {
  const color = field.shared ? colors.orange : VERDICT_COLOR[field.verdict];
  return (
    <View style={styles.col}>
      <Txt weight="bold" style={{ fontSize: 16, color: colors.ink }} numberOfLines={1}>
        {field.answer || '—'}
      </Txt>
      <Txt style={{ fontSize: 12, color }} numberOfLines={2}>
        {field.shared ? t.qalaqebi.shared : t.qalaqebi.verdict[field.verdict]}
      </Txt>
      <Txt weight="black" style={{ fontSize: 18, color }}>
        {field.points > 0 ? `+${field.points}` : '0'}
      </Txt>
    </View>
  );
}

function Total({ label, value, win }: { label: string; value: number; win: boolean }) {
  return (
    <View style={[styles.col, styles.total, win && styles.totalWin]}>
      <Txt style={{ color: colors.muted, fontSize: 13 }}>{label}</Txt>
      <Txt weight="black" style={{ fontSize: 32, lineHeight: 42, color: colors.ink }}>
        {value}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 12 },
  banner: { flex: 1, backgroundColor: colors.sticker, padding: 10, borderRadius: 10 },
  headRow: { flexDirection: 'row', gap: 12, marginBottom: 4 },
  block: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.grid },
  row: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },
  total: {
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.grid,
    backgroundColor: colors.card,
  },
  totalWin: { borderColor: colors.green },
});
