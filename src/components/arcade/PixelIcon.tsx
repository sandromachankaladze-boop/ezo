import Svg, { Path } from 'react-native-svg';
import { arcade } from '@/theme';

// Small pixel-art icons drawn on a tiny grid (each unit = one "pixel").
type Shape = { w: number; h: number; layers: { d: string; fill: string }[] };

const ICONS = {
  coin: { w: 6, h: 6, layers: [{ d: 'M1 0h4v1H1zM0 1h6v4H0zM1 5h4v1H1z', fill: arcade.yellow }, { d: 'M3 2h1v2H3z', fill: '#C98A00' }] },
  star: { w: 7, h: 7, layers: [{ d: 'M3 0h1v1H3zM2 1h3v1H2zM0 2h7v1H0zM1 3h5v1H1zM2 4h3v1H2zM1 5h2v1H1zM4 5h2v1H4zM0 6h1v1H0zM6 6h1v1H6z', fill: arcade.yellow }] },
  cursor: { w: 4, h: 7, layers: [{ d: 'M0 0h1v7H0zM1 1h1v5H1zM2 2h1v3H2zM3 3h1v1H3z', fill: arcade.orange }] },
  back: { w: 4, h: 7, layers: [{ d: 'M3 0h1v7H3zM2 1h1v5H2zM1 2h1v3H1zM0 3h1v1H0z', fill: arcade.ink }] },
  up: { w: 7, h: 4, layers: [{ d: 'M3 0h1v1H3zM2 1h3v1H2zM1 2h5v1H1zM0 3h7v1H0z', fill: arcade.cream }] },
  down: { w: 7, h: 4, layers: [{ d: 'M0 0h7v1H0zM1 1h5v1H1zM2 2h3v1H2zM3 3h1v1H3z', fill: arcade.cream }] },
  lock: { w: 5, h: 7, layers: [{ d: 'M1 0h3v1H1zM0 1h1v2H0zM4 1h1v2H4zM0 3h5v4H0z', fill: arcade.yellow }, { d: 'M2 4h1v2H2z', fill: arcade.ink }] },
  house: { w: 7, h: 7, layers: [{ d: 'M3 0h1v1H3zM2 1h3v1H2zM1 2h5v1H1zM0 3h7v1H0zM1 4h1v3H1zM5 4h1v3H5zM3 5h1v2H3zM2 6h1v1H2zM4 6h1v1H4z', fill: arcade.ink }] },
  trophy: { w: 7, h: 7, layers: [{ d: 'M0 0h7v1H0zM0 1h1v1H0zM2 1h3v1H2zM6 1h1v1H6zM1 2h5v1H1zM2 3h3v1H2zM3 4h1v1H3zM2 5h3v1H2zM1 6h5v1H1z', fill: arcade.yellow }] },
  bolt: { w: 7, h: 7, layers: [{ d: 'M4 0h2v1H4zM3 1h2v1H3zM2 2h4v1H2zM1 3h4v1H1zM3 4h2v1H3zM2 5h2v1H2zM1 6h2v1H1z', fill: arcade.teal }] },
  gear: { w: 7, h: 7, layers: [{ d: 'M1 0h1v1H1zM3 0h1v1H3zM5 0h1v1H5zM0 1h7v1H0zM1 2h2v1H1zM4 2h2v1H4zM0 3h2v1H0zM5 3h2v1H5zM1 4h2v1H1zM4 4h2v1H4zM0 5h7v1H0zM1 6h1v1H1zM3 6h1v1H3zM5 6h1v1H5z', fill: arcade.crtText }] },
} satisfies Record<string, Shape>;

export type PixelIconName = keyof typeof ICONS;

type Props = { name: PixelIconName; size?: number; color?: string };

// `size` is the height in points; the width follows the icon's own proportions.
export function PixelIcon({ name, size = 18, color }: Props) {
  const icon: Shape = ICONS[name];
  const width = (size * icon.w) / icon.h;
  return (
    <Svg width={width} height={size} viewBox={`0 0 ${icon.w} ${icon.h}`}>
      {icon.layers.map((layer, i) => (
        <Path key={i} d={layer.d} fill={i === 0 && color ? color : layer.fill} />
      ))}
    </Svg>
  );
}
