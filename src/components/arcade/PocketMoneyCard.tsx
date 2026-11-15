import { useState } from 'react';
import { Animated, Modal, StyleSheet, View } from 'react-native';
import { Txt } from '@/components/Txt';
import { PocketGift } from '@/economy/rules';
import { t } from '@/i18n';
import { arcade } from '@/theme';
import { ArcadeWindow } from './ArcadeWindow';
import { PixelButton } from './PixelButton';
import { PixelIcon } from './PixelIcon';

type Props = { gift: PocketGift | null; onCollect: () => Promise<void> };

// Grandma's morning card: today's pocket money (+ streak bonus). Coins drop in when collected.
export function PocketMoneyCard({ gift, onCollect }: Props) {
  const [dropping, setDropping] = useState(false);
  const drops = useState(() => Array.from({ length: 10 }, () => new Animated.Value(0)))[0];

  async function collect() {
    setDropping(true);
    Animated.stagger(
      60,
      drops.map((v) => Animated.timing(v, { toValue: 1, duration: 350, useNativeDriver: true })),
    ).start(async () => {
      await onCollect();
      setDropping(false);
      drops.forEach((v) => v.setValue(0));
    });
  }

  return (
    <Modal visible={!!gift} transparent animationType="fade" onRequestClose={collect}>
      <View style={styles.backdrop}>
        {gift && (
          <ArcadeWindow title={t.coins.grandmaTitle} barColor={arcade.yellow} style={styles.window}>
            <Txt weight="bold" style={styles.hello}>
              {t.coins.grandmaHello}
            </Txt>
            <Line label={t.coins.pocket} value={gift.pocket} />
            {gift.streakBonus > 0 && <Line label={t.coins.streak(gift.streak)} value={gift.streakBonus} />}
            <View style={styles.sep} />
            <Line label={t.coins.total} value={gift.total} strong />
            <View style={styles.drops} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
              {dropping &&
                drops.map((v, i) => (
                  <Animated.View
                    key={i}
                    style={{
                      opacity: v,
                      transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [-40, 0] }) }],
                    }}>
                    <PixelIcon name="coin" size={18} />
                  </Animated.View>
                ))}
            </View>
            <PixelButton title={t.coins.collect} color={arcade.yellow} onPress={collect} disabled={dropping} />
          </ArcadeWindow>
        )}
      </View>
    </Modal>
  );
}

function Line({ label, value, strong }: { label: string; value: number; strong?: boolean }) {
  return (
    <View style={styles.line}>
      <Txt weight={strong ? 'black' : 'regular'} style={[styles.lineLabel, strong && { fontSize: 15 }]}>
        {label}
      </Txt>
      <Txt weight="pixel" style={[styles.lineValue, strong && { color: arcade.magenta }]}>
        +{value}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(13,8,32,0.8)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  window: { width: '100%', maxWidth: 360 },
  hello: { fontSize: 15, lineHeight: 21, color: arcade.ink, marginBottom: 4 },
  line: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lineLabel: { fontSize: 14, color: arcade.ink },
  lineValue: { fontSize: 11, color: arcade.ink },
  sep: { height: 2, backgroundColor: arcade.ink, opacity: 0.2, marginVertical: 2 },
  drops: { height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', gap: 4 },
});
