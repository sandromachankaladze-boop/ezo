import { Text, TextProps } from 'react-native';
import { colors, fonts } from '@/theme';

type Props = TextProps & { weight?: keyof typeof fonts };

// ტექსტი ქართული ფონტით. ყველგან <Text>-ის ნაცვლად ამას ვიყენებთ.
export function Txt({ weight = 'regular', style, ...rest }: Props) {
  return <Text style={[{ fontFamily: fonts[weight], color: colors.pencil, fontSize: 16 }, style]} {...rest} />;
}
