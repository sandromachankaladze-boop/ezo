import { Pressable, StyleSheet, View } from 'react-native';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { arcade } from '@/theme';
import { PixelIcon } from './PixelIcon';
import { Stripes } from './Patterns';

type Props = {
  onUp: () => void;
  onDown: () => void;
  onOk: () => void;
  okEnabled: boolean;
  onBack?: () => void; // no back on the home screen
};

// Joystick, up/down buttons, and the big round "back" and "OK" buttons, in the thumb zone.
export function ControlDeck({ onUp, onDown, onOk, okEnabled, onBack }: Props) {
  return (
    <View style={styles.deck}>
      <Stripes />
      <View style={styles.left}>
        <View style={styles.joystick} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <View style={styles.joyBase} />
          <View style={styles.joyStick} />
          <View style={styles.joyBall} />
        </View>
        <View style={{ gap: 8 }}>
          <MiniButton label={t.arcade.up} icon="up" onPress={onUp} />
          <MiniButton label={t.arcade.down} icon="down" onPress={onDown} />
        </View>
      </View>
      <View style={styles.right}>
        <View style={[styles.labelled, { marginBottom: 16 }]}>
          <RoundButton
            label={t.arcade.back}
            color={arcade.yellow}
            onPress={onBack}
            disabled={!onBack}>
            <PixelIcon name="back" size={20} />
          </RoundButton>
          <Txt weight="black" style={styles.caption}>
            {t.arcade.back}
          </Txt>
        </View>
        <View style={styles.labelled}>
          <RoundButton label={t.arcade.start} color={arcade.green} onPress={onOk} disabled={!okEnabled}>
            <Txt weight="pixel" style={styles.ok}>
              OK
            </Txt>
          </RoundButton>
          <Txt weight="black" style={styles.caption}>
            {t.arcade.start}
          </Txt>
        </View>
      </View>
    </View>
  );
}

function MiniButton({ label, icon, onPress }: { label: string; icon: 'up' | 'down'; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [styles.mini, pressed && styles.pressedSmall]}>
      <PixelIcon name={icon} size={8} />
    </Pressable>
  );
}

type RoundProps = {
  label: string;
  color: string;
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

function RoundButton({ label, color, onPress, disabled, children }: RoundProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.round,
        { backgroundColor: color },
        disabled && { opacity: 0.5 },
        pressed && styles.pressedRound,
      ]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  deck: {
    height: 136,
    borderWidth: 3,
    borderColor: arcade.ink,
    borderRadius: 6,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  right: { flexDirection: 'row', alignItems: 'flex-end', gap: 14 },
  joystick: { width: 70, height: 70 },
  joyBase: { position: 'absolute', left: 7, top: 34, width: 56, height: 28, borderRadius: 28, backgroundColor: arcade.ink },
  joyStick: {
    position: 'absolute',
    left: 31,
    top: 14,
    width: 8,
    height: 36,
    backgroundColor: arcade.steel,
    borderWidth: 2,
    borderColor: arcade.ink,
  },
  joyBall: {
    position: 'absolute',
    left: 20,
    top: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: arcade.red,
    borderWidth: 3,
    borderColor: arcade.ink,
  },
  mini: {
    width: 38,
    height: 32,
    borderWidth: 3,
    borderColor: arcade.ink,
    borderRadius: 8,
    backgroundColor: arcade.steel,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: arcade.ink,
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  pressedSmall: { transform: [{ translateY: 2 }], shadowOffset: { width: 0, height: 1 } },
  labelled: { alignItems: 'center', gap: 4 },
  round: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 3,
    borderColor: arcade.ink,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: arcade.ink,
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  pressedRound: { transform: [{ translateY: 3 }], shadowOffset: { width: 0, height: 2 } },
  ok: { fontSize: 11, color: arcade.ink },
  caption: { fontSize: 11, color: arcade.ink },
});
