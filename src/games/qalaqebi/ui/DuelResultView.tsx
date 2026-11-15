import { StyleSheet, View } from 'react-native';
import { ArcadeWindow } from '@/components/arcade/ArcadeWindow';
import { CoinRewardWindow } from '@/components/arcade/CoinRewardWindow';
import { NeonLetter } from '@/components/arcade/NeonLetter';
import { PixelButton } from '@/components/arcade/PixelButton';
import { Txt } from '@/components/Txt';
import { RewardLine } from '@/economy/rules';
import { t } from '@/i18n';
import { arcade } from '@/theme';
import { DuelResult } from '../logic/duel';
import { FieldResult } from '../logic/scoring';
import { CATEGORIES } from './categoryMeta';
import { SHARED_COLOR, VERDICT_COLOR } from './verdictColors';

type Props = {
  letter: string;
  result: DuelResult;
  reward: RewardLine[];
  onRematch: () => void;
  onSolo: () => void;
};

// 2-player result: both players' answers side by side, totals and the winner.
export function DuelResultView({ letter, result, reward, onRematch, onSolo }: Props) {
  const [p1, p2] = result.players;
  const banner = result.winner === 'tie' ? t.qalaqebi.tie : t.qalaqebi.winner(result.winner + 1);

  return (
    <>
      <View style={styles.topRow}>
        <NeonLetter letter={letter} size={56} />
        <View style={styles.banner}>
          <Txt weight="black" style={styles.bannerText}>
            {banner}
          </Txt>
        </View>
      </View>

      <ArcadeWindow title={t.qalaqebi.answersTitle}>
        <View style={styles.cols}>
          <Txt weight="black" style={styles.head}>
            {t.qalaqebi.player(1)}
          </Txt>
          <Txt weight="black" style={styles.head}>
            {t.qalaqebi.player(2)}
          </Txt>
        </View>
        {CATEGORIES.map((cat, i) => (
          <View key={cat.key} style={styles.block}>
            <Txt style={styles.cat}>
              {cat.emoji} {cat.label}
            </Txt>
            <View style={styles.cols}>
              <Cell field={p1.fields[i]} />
              <Cell field={p2.fields[i]} />
            </View>
          </View>
        ))}
        <View style={[styles.block, { borderBottomWidth: 0 }]}>
          <Txt style={styles.cat}>{t.qalaqebi.timeBonus}</Txt>
          <View style={styles.cols}>
            <Txt weight="pixel" style={styles.bonus}>
              +{p1.timeBonus}
            </Txt>
            <Txt weight="pixel" style={styles.bonus}>
              +{p2.timeBonus}
            </Txt>
          </View>
        </View>
      </ArcadeWindow>

      <View style={styles.cols}>
        <Total value={p1.total} win={result.winner === 0} />
        <Total value={p2.total} win={result.winner === 1} />
      </View>

      {reward.length > 0 && <CoinRewardWindow lines={reward} />}
      <PixelButton title={t.qalaqebi.rematch} onPress={onRematch} />
      <PixelButton title={t.qalaqebi.toSolo} onPress={onSolo} color={arcade.yellow} />
    </>
  );
}

function Cell({ field }: { field: FieldResult }) {
  const color = field.shared ? SHARED_COLOR : VERDICT_COLOR[field.verdict];
  return (
    <View style={{ flex: 1 }}>
      <Txt weight="black" style={styles.answer} numberOfLines={1}>
        {field.answer || '—'}
      </Txt>
      <Txt style={[styles.verdict, { color }]} numberOfLines={2}>
        {field.shared ? t.qalaqebi.shared : t.qalaqebi.verdict[field.verdict]}
      </Txt>
      <Txt weight="pixel" style={[styles.points, { color }]}>
        {field.points > 0 ? `+${field.points}` : '0'}
      </Txt>
    </View>
  );
}

function Total({ value, win }: { value: number; win: boolean }) {
  return (
    <View style={[styles.total, win && styles.totalWin]}>
      <Txt style={styles.totalLabel}>{t.qalaqebi.total}</Txt>
      <Txt weight="pixel" style={[styles.totalNum, { color: win ? arcade.green : arcade.cream }]}>
        {value}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  banner: {
    flex: 1,
    backgroundColor: arcade.yellow,
    borderWidth: 2,
    borderColor: arcade.ink,
    borderRadius: 8,
    padding: 10,
  },
  bannerText: { fontSize: 17, color: arcade.ink },
  cols: { flexDirection: 'row', gap: 12 },
  head: { flex: 1, fontSize: 13, color: arcade.ink },
  block: { paddingVertical: 6, gap: 2, borderBottomWidth: 1, borderBottomColor: '#E2D6C4' },
  cat: { fontSize: 12, color: '#6B5A86' },
  answer: { fontSize: 15, color: arcade.ink },
  verdict: { fontSize: 11, lineHeight: 15 },
  points: { fontSize: 11, marginTop: 2 },
  bonus: { flex: 1, fontSize: 11, color: arcade.ink },
  total: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: arcade.muted,
    backgroundColor: 'rgba(255,244,224,0.06)',
  },
  totalWin: { borderColor: arcade.green, backgroundColor: 'rgba(76,201,76,0.12)' },
  totalLabel: { fontSize: 12, color: arcade.crtText },
  totalNum: { fontSize: 24, lineHeight: 30 },
});
