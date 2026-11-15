import { StyleSheet, View } from 'react-native';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { arcade } from '@/theme';

// Lower part of the cabinet with the coin slot (coins will be added later).
export function CoinDoor() {
  return (
    <View style={styles.lower}>
      <View style={styles.door}>
        <View style={styles.slot} />
        <Txt weight="bold" style={styles.label}>
          {t.arcade.insertCoin}
        </Txt>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lower: {
    height: 64,
    backgroundColor: arcade.magentaDark,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 3,
    borderLeftColor: arcade.berry,
    borderRightColor: arcade.berryDeep,
    borderBottomColor: arcade.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  door: {
    width: 150,
    height: 46,
    backgroundColor: arcade.steel,
    borderWidth: 3,
    borderColor: arcade.ink,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  slot: { width: 6, height: 24, backgroundColor: arcade.buildingEdge, borderWidth: 2, borderColor: '#5A5A66' },
  label: { fontSize: 11, lineHeight: 13, color: arcade.yellow },
});
