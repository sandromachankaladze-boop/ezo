import { Pressable, StyleSheet, View } from 'react-native';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { arcade } from '@/theme';
import { PixelIcon } from './PixelIcon';

// Slim marquee for game screens: yellow back button + the game's name in neon.
export function CompactMarquee({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <View style={styles.marquee}>
      {onBack && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t.arcade.back}
          onPress={onBack}
          hitSlop={8}
          style={({ pressed }) => [styles.back, pressed && { transform: [{ translateY: 2 }] }]}>
          <PixelIcon name="back" size={16} />
        </Pressable>
      )}
      <View style={styles.sign}>
        <View style={styles.bulb} />
        <Txt weight="black" style={styles.title} accessibilityRole="header" numberOfLines={1}>
          {title}
        </Txt>
        <View style={styles.bulb} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  marquee: {
    height: 54,
    backgroundColor: arcade.berry,
    borderWidth: 3,
    borderColor: arcade.ink,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  back: {
    width: 36,
    height: 36,
    borderWidth: 3,
    borderColor: arcade.ink,
    borderRadius: 8,
    backgroundColor: arcade.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sign: {
    flex: 1,
    height: 36,
    backgroundColor: arcade.night,
    borderWidth: 2,
    borderColor: arcade.ink,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 19,
    lineHeight: 26,
    color: arcade.orange,
    textShadowColor: arcade.magenta,
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
  },
  bulb: { width: 8, height: 8, borderRadius: 4, backgroundColor: arcade.bulb },
});
