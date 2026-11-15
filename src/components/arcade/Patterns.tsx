import { StyleSheet } from 'react-native';
import Svg, { Defs, Pattern, Rect } from 'react-native-svg';
import { arcade } from '@/theme';

// Diagonal orange stripes for the control deck.
export function Stripes() {
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <Pattern id="stripes" width={44} height={44} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <Rect width={22} height={44} fill={arcade.orange} />
          <Rect x={22} width={22} height={44} fill={arcade.coral} />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#stripes)" />
    </Svg>
  );
}

// Faint horizontal lines that make the screen look like an old CRT.
export function Scanlines() {
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <Pattern id="scan" width={4} height={3} patternUnits="userSpaceOnUse">
          <Rect width={4} height={1} fill="#FFFFFF" opacity={0.05} />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#scan)" />
    </Svg>
  );
}

// Neon notebook paper: glowing cyan grid on dark purple.
export function GridPaper() {
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <Pattern id="grid" width={18} height={18} patternUnits="userSpaceOnUse">
          <Rect width={18} height={1} fill={arcade.teal} opacity={0.32} />
          <Rect width={1} height={18} fill={arcade.teal} opacity={0.32} />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="#140A2B" />
      <Rect width="100%" height="100%" fill="url(#grid)" />
    </Svg>
  );
}
