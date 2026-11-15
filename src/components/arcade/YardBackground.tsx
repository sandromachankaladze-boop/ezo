import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { arcade } from '@/theme';

// The yard at dusk: sky bands, two houses with wooden balconies, grapevine and string lights.
// Pure decoration: drawn behind everything, ignores touches.
export function YardBackground() {
  const { width } = useWindowDimensions();
  const bulbs = [0.1, 0.27, 0.44, 0.6, 0.77, 0.92];
  // the light string sags in the middle: y = 14 + 44 * x * (1 - x) * 2
  const sag = (x: number) => 14 + 44 * x * (1 - x) * 2;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[styles.band, { flex: 2.4, backgroundColor: arcade.night }]} />
      <View style={[styles.band, { flex: 1.8, backgroundColor: arcade.night2 }]} />
      <View style={[styles.band, { flex: 2, backgroundColor: arcade.night3 }]} />
      <View style={[styles.band, { flex: 2.1, backgroundColor: arcade.night4 }]} />

      {/* left house */}
      <View style={[styles.house, { left: -30, top: '18%', borderRightWidth: 3 }]}>
        <View style={[styles.window, { left: 34, top: 40, backgroundColor: arcade.windowLit }]} />
        <View style={[styles.window, { left: 34, top: 260, backgroundColor: arcade.windowDark }]} />
      </View>
      <View style={[styles.rail, { left: -4, top: '26%' }]} />
      <View style={[styles.leaf, { left: 0, top: '16%', backgroundColor: arcade.leaf }]} />
      <View style={[styles.leaf, { left: 10, top: '15%', backgroundColor: arcade.leafLight }]} />
      <View style={[styles.leaf, { left: 4, top: '17.3%', width: 8, height: 8, backgroundColor: arcade.leafDark }]} />

      {/* right house */}
      <View style={[styles.house, { right: -30, top: '14%', borderLeftWidth: 3 }]}>
        <View style={[styles.window, { left: 10, top: 70, backgroundColor: arcade.windowLit }]} />
        <View style={[styles.window, { left: 10, top: 330, backgroundColor: arcade.windowLit }]} />
      </View>
      <View style={[styles.rail, { right: -2, top: '35%' }]} />

      {/* string lights */}
      <Svg width={width} height={64} style={styles.lights}>
        <Path d={`M0 14 Q${width / 2} 58 ${width} 14`} fill="none" stroke={arcade.buildingEdge} strokeWidth={2} />
        {bulbs.map((x) => (
          <Circle key={x} cx={x * width} cy={sag(x)} r={7} fill={arcade.orange} opacity={0.25} />
        ))}
        {bulbs.map((x) => (
          <Circle key={`b${x}`} cx={x * width} cy={sag(x)} r={3.5} fill={arcade.bulb} />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  band: { width: '100%' },
  house: {
    position: 'absolute',
    width: 62,
    height: '80%',
    backgroundColor: arcade.building,
    borderColor: arcade.buildingEdge,
  },
  window: {
    position: 'absolute',
    width: 16,
    height: 22,
    shadowColor: arcade.orange,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  rail: {
    position: 'absolute',
    width: 30,
    height: 24,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: arcade.wood,
  },
  leaf: { position: 'absolute', width: 10, height: 10 },
  lights: { position: 'absolute', left: 0, top: 0 },
});
