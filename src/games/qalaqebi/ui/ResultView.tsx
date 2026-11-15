import { StyleSheet, View } from 'react-native';
import { ArcadeWindow } from '@/components/arcade/ArcadeWindow';
import { CoinRewardWindow } from '@/components/arcade/CoinRewardWindow';
import { NeonLetter } from '@/components/arcade/NeonLetter';
import { PixelButton } from '@/components/arcade/PixelButton';
import { Txt } from '@/components/Txt';
import { RewardLine } from '@/economy/rules';
import { t } from '@/i18n';
import { arcade } from '@/theme';
import { RoundResult } from '../logic/scoring';
import { CATEGORIES } from './categoryMeta';
import { VERDICT_COLOR } from './verdictColors';

type Props = {
  letter: string;
  result: RoundResult;
  best: number;
  newRecord: boolean;
  reward: RewardLine[];
  onAgain: () => void;
};

// Solo round result: score, each answer with its verdict, time bonus, record.
export function ResultView({ letter, result, best, newRecord, reward, onAgain }: Props) {
  return (
    <>
      <View style={styles.topRow}>
        <NeonLetter letter={letter} />
        <View style={{ alignItems: 'flex-end', gap: 4 }}>
          <Txt weight="pixel" style={styles.total}>
            {result.total}
          </Txt>
          <Txt style={styles.totalLabel}>{t.qalaqebi.points}</Txt>
        </View>
      </View>
      {newRecord && (
        <View style={styles.record}>
          <Txt weight="black" style={styles.recordText}>
            {t.qalaqebi.newRecord}
          </Txt>
        </View>
      )}

      <ArcadeWindow title={t.qalaqebi.answersTitle}>
        {result.fields.map((f) => {
          const cat = CATEGORIES.find((c) => c.key === f.category)!;
          const color = VERDICT_COLOR[f.verdict];
          return (
            <View key={f.category} style={styles.row}>
              <View style={{ flex: 1 }}>
                <Txt style={styles.cat}>
                  {cat.emoji} {cat.label}
                </Txt>
                <Txt weight="black" style={styles.answer}>
                  {f.answer || '—'}
                </Txt>
                <Txt style={[styles.verdict, { color }]}>{t.qalaqebi.verdict[f.verdict]}</Txt>
              </View>
              <Txt weight="pixel" style={[styles.points, { color }]}>
                {f.points > 0 ? `+${f.points}` : '0'}
              </Txt>
            </View>
          );
        })}
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Txt style={{ flex: 1, fontSize: 14, color: arcade.ink }}>{t.qalaqebi.timeBonus}</Txt>
          <Txt weight="pixel" style={[styles.points, { color: arcade.ink }]}>
            +{result.timeBonus}
          </Txt>
        </View>
      </ArcadeWindow>

      {reward.length > 0 && <CoinRewardWindow lines={reward} />}
      <Txt style={styles.best}>{t.qalaqebi.best(best)}</Txt>
      <PixelButton title={t.qalaqebi.again} onPress={onAgain} />
    </>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  total: {
    fontSize: 32,
    lineHeight: 40,
    color: arcade.yellow,
    textShadowColor: arcade.orange,
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
  },
  totalLabel: { fontSize: 13, color: arcade.crtText },
  record: {
    alignSelf: 'flex-start',
    backgroundColor: arcade.yellow,
    borderWidth: 2,
    borderColor: arcade.ink,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  recordText: { fontSize: 14, color: arcade.ink },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E2D6C4',
  },
  cat: { fontSize: 12, color: '#6B5A86' },
  answer: { fontSize: 17, color: arcade.ink },
  verdict: { fontSize: 12 },
  points: { fontSize: 12, minWidth: 40, textAlign: 'right' },
  best: { fontSize: 13, color: arcade.crtText, textAlign: 'center' },
});
