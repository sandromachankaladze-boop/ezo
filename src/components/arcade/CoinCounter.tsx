import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Txt } from '@/components/Txt';
import { useWallet } from '@/hooks/useWallet';
import { t } from '@/i18n';
import { arcade } from '@/theme';
import { PixelIcon } from './PixelIcon';

// Coin chip with the current balance; it "pops" every time the number changes.
export function CoinCounter() {
  const { wallet } = useWallet();
  const scale = useState(() => new Animated.Value(1))[0];
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.3, duration: 150, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  }, [wallet.coins, scale]);

  return (
    <Animated.View
      style={[styles.chip, { transform: [{ scale }] }]}
      accessible
      accessibilityLabel={t.coins.label(wallet.coins)}>
      <PixelIcon name="coin" size={15} />
      <Txt weight="pixel" style={styles.num}>
        {wallet.coins}
      </Txt>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 32,
    paddingHorizontal: 8,
    backgroundColor: arcade.cream,
    borderWidth: 2,
    borderColor: arcade.ink,
    borderRadius: 10,
  },
  num: { fontSize: 10, color: arcade.ink },
});
