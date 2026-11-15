import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { Txt } from '@/components/Txt';
import { creditReadyAt, howToPay } from '@/economy/rules';
import { useWallet } from '@/hooks/useWallet';
import { t } from '@/i18n';
import { payRound } from '@/services/wallet';
import { arcade, fonts } from '@/theme';
import { PixelIcon } from './PixelIcon';

type Props = { duel?: boolean; onPaid: () => void };

// "Insert coin" before a round: tap the bobbing coin, it drops into the slot, the round starts.
// With 0 coins the round is free on credit (ნისია) once every 30 minutes.
export function InsertCoin({ duel, onPaid }: Props) {
  const { wallet, loaded } = useWallet();
  const [now, setNow] = useState(() => Date.now());
  const [busy, setBusy] = useState(false);
  const blink = useState(() => new Animated.Value(1))[0];
  const bob = useState(() => new Animated.Value(0))[0];
  const drop = useState(() => new Animated.Value(0))[0];

  // refresh the credit countdown
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(id);
  }, []);

  // blinking "insert coin" and a gently bobbing coin
  useEffect(() => {
    const a = Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0.15, duration: 0, delay: 600, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 1, duration: 0, delay: 500, useNativeDriver: true }),
      ]),
    );
    const b = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: -6, duration: 600, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 600, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ]),
    );
    a.start();
    b.start();
    return () => {
      a.stop();
      b.stop();
    };
  }, [blink, bob]);

  const how = loaded ? howToPay(wallet, now) : null;
  const waitMin = Math.max(1, Math.ceil((creditReadyAt(wallet) - now) / 60_000));

  function insert() {
    if (!how || busy) return;
    setBusy(true);
    Animated.timing(drop, { toValue: 1, duration: 450, easing: Easing.in(Easing.quad), useNativeDriver: true }).start(
      async () => {
        const ok = await payRound();
        drop.setValue(0);
        setBusy(false);
        if (ok) onPaid();
      },
    );
  }

  return (
    <View style={styles.wrap}>
      <Animated.Text style={[styles.prompt, { opacity: blink }]} accessibilityRole="header">
        {t.coins.insert}
      </Animated.Text>
      <Txt style={styles.line}>{t.coins.costLine}</Txt>
      {duel && <Txt style={styles.small}>{t.coins.duelLine}</Txt>}

      <View style={styles.door}>
        <View style={styles.coinSpot}>
          {how && (
            <Pressable accessibilityRole="button" accessibilityLabel={t.coins.insert} onPress={insert} hitSlop={16}>
              <Animated.View
                style={{
                  transform: [
                    { translateY: Animated.add(bob, drop.interpolate({ inputRange: [0, 1], outputRange: [0, 64] })) },
                    { scaleX: drop.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 0.3, 0.1] }) },
                  ],
                  opacity: drop.interpolate({ inputRange: [0, 0.85, 1], outputRange: [1, 1, 0] }),
                }}>
                <PixelIcon name="coin" size={48} />
              </Animated.View>
            </Pressable>
          )}
        </View>
        <View style={[styles.slot, how && styles.slotGlow]} />
        <Txt weight="pixel" style={styles.coinLabel}>
          1 COIN
        </Txt>
      </View>

      {how === 'coin' && <Txt style={styles.tap}>{t.coins.tapCoin}</Txt>}
      {how === 'credit' && <Txt style={styles.note}>{t.coins.onCredit}</Txt>}
      {loaded && !how && (
        <>
          <Txt style={styles.note}>{t.coins.waitCredit(waitMin)}</Txt>
          <Txt style={styles.small}>{t.coins.tomorrow}</Txt>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingVertical: 16 },
  prompt: {
    fontFamily: fonts.black,
    fontSize: 26,
    lineHeight: 36,
    color: arcade.yellow,
    textAlign: 'center',
    textShadowColor: arcade.orange,
    textShadowRadius: 12,
    textShadowOffset: { width: 0, height: 0 },
  },
  line: { fontSize: 15, color: arcade.crtText, textAlign: 'center' },
  small: { fontSize: 12, lineHeight: 18, color: arcade.lavender, textAlign: 'center' },
  door: {
    width: 200,
    height: 160,
    marginTop: 8,
    backgroundColor: arcade.steel,
    borderWidth: 3,
    borderColor: arcade.ink,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 16,
    gap: 10,
  },
  coinSpot: { position: 'absolute', top: 14, height: 60, alignItems: 'center', justifyContent: 'center' },
  slot: { width: 70, height: 12, backgroundColor: arcade.buildingEdge, borderWidth: 3, borderColor: '#5A5A66', borderRadius: 3 },
  slotGlow: {
    borderColor: arcade.yellow,
    shadowColor: arcade.yellow,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  coinLabel: { fontSize: 9, color: arcade.yellow },
  tap: { fontSize: 13, color: arcade.cream },
  note: { fontSize: 14, lineHeight: 20, color: arcade.yellow, textAlign: 'center', paddingHorizontal: 8 },
});
