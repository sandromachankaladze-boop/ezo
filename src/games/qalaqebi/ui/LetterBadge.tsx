import { StyleSheet, View } from 'react-native';
import { Txt } from '@/components/Txt';
import { colors } from '@/theme';

// დიდი წითელი ასო (თითქოს მასწავლებელმა დაწერა)
export function LetterBadge({ letter }: { letter: string }) {
  return (
    <View style={styles.box}>
      <Txt weight="black" style={styles.letter}>
        {letter}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 88,
    height: 88,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: colors.red,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-4deg' }],
  },
  letter: { fontSize: 52, color: colors.red, lineHeight: 70 },
});
