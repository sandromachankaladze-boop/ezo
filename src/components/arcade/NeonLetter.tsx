import { StyleSheet, View } from 'react-native';
import { Txt } from '@/components/Txt';
import { arcade } from '@/theme';

// A glowing pink letter in a tilted neon frame (the round's letter).
export function NeonLetter({ letter, size = 64 }: { letter: string; size?: number }) {
  return (
    <View style={[styles.box, { width: size, height: size }]} accessible accessibilityLabel={letter}>
      <Txt weight="black" style={[styles.letter, { fontSize: size * 0.58, lineHeight: size * 0.72 }]}>
        {letter}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 3,
    borderColor: arcade.magenta,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-4deg' }],
    shadowColor: arcade.magenta,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  letter: {
    color: '#FFB3D6',
    textShadowColor: arcade.magenta,
    textShadowRadius: 12,
    textShadowOffset: { width: 0, height: 0 },
  },
});
