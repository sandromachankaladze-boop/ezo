import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Txt } from './Txt';
import { colors } from '@/theme';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
  style?: ViewStyle;
};

// Big button, easy to press with one thumb.
export function InkButton({ title, onPress, variant = 'primary', disabled, style }: Props) {
  const primary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        primary ? styles.primary : styles.outline,
        pressed && { transform: [{ translateY: 2 }], shadowOffset: { width: 0, height: 1 } },
        disabled && { opacity: 0.4 },
        style,
      ]}>
      <Txt weight="bold" style={{ fontSize: 18, color: primary ? '#fff' : colors.ink }}>
        {title}
      </Txt>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.ink,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  primary: { backgroundColor: colors.ink },
  outline: { backgroundColor: colors.card },
});
