import { StyleSheet, View } from 'react-native';
import { Txt } from '@/components/Txt';
import { RewardLine, sumReward } from '@/economy/rules';
import { t } from '@/i18n';
import { arcade } from '@/theme';
import { ArcadeWindow } from './ArcadeWindow';

// "Coins earned" window on result screens (the coins are already added to the wallet).
export function CoinRewardWindow({ lines }: { lines: RewardLine[] }) {
  return (
    <ArcadeWindow title={t.coins.earnedTitle} barColor={arcade.yellow}>
      {lines.map((l) => (
        <View key={l.key} style={styles.line}>
          <Txt style={styles.label}>{t.coins.reward[l.key]}</Txt>
          <Txt weight="pixel" style={styles.value}>
            +{l.amount}
          </Txt>
        </View>
      ))}
      <View style={styles.sep} />
      <View style={styles.line}>
        <Txt weight="black" style={[styles.label, { fontSize: 15 }]}>
          {t.coins.total}
        </Txt>
        <Txt weight="pixel" style={[styles.value, { color: arcade.magenta }]}>
          +{sumReward(lines)}
        </Txt>
      </View>
    </ArcadeWindow>
  );
}

const styles = StyleSheet.create({
  line: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 14, color: arcade.ink },
  value: { fontSize: 11, color: arcade.ink },
  sep: { height: 2, backgroundColor: arcade.ink, opacity: 0.2, marginVertical: 2 },
});
