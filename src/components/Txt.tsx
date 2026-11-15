import { Text, TextProps } from 'react-native';
import { colors, fonts } from '@/theme';

type Props = TextProps & { weight?: keyof typeof fonts };

// Text with the Georgian font. Use this everywhere instead of <Text>.
export function Txt({ weight = 'regular', style, ...rest }: Props) {
  return <Text style={[{ fontFamily: fonts[weight], color: colors.pencil, fontSize: 16 }, style]} {...rest} />;
}
