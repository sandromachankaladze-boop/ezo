import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Txt } from '@/components/Txt';
import { arcade } from '@/theme';

type Props = {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  style?: ViewStyle;
};

// Chunky pill button with a dark outline and a hard shadow that "presses in" when tapped.
export function PixelButton({ title, onPress, color = arcade.green, disabled, style }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: color },
        disabled && { opacity: 0.45 },
        pressed && styles.pressed,
        style,
      ]}>
      <Txt weight="black" style={styles.label}>
        {title}
      </Txt>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    paddingHorizontal: 18,
    borderWidth: 3,
    borderColor: arcade.ink,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: arcade.ink,
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 4, height: 4 },
    elevation: 4,
  },
  pressed: { transform: [{ translateX: 3 }, { translateY: 3 }], shadowOffset: { width: 1, height: 1 } },
  label: { fontSize: 17, color: arcade.ink },
});
