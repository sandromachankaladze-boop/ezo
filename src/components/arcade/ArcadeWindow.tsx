import { StyleSheet, View, ViewProps } from 'react-native';
import { Txt } from '@/components/Txt';
import { arcade } from '@/theme';

type Props = ViewProps & {
  title: string;
  barColor?: string;
  bodyColor?: string;
};

// Y2K-style window: coloured title bar with a little square "close" box, thick outline, hard shadow.
export function ArcadeWindow({ title, barColor = arcade.teal, bodyColor = arcade.cream, style, children, ...rest }: Props) {
  return (
    <View style={[styles.shadow, style]} {...rest}>
      <View style={styles.frame}>
        <View style={[styles.bar, { backgroundColor: barColor }]}>
          <Txt weight="black" style={styles.title} numberOfLines={1}>
            {title}
          </Txt>
          <View style={styles.box} />
        </View>
        <View style={[styles.body, { backgroundColor: bodyColor }]}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 8,
    shadowColor: arcade.ink,
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 4, height: 4 },
    elevation: 4,
  },
  frame: { borderWidth: 3, borderColor: arcade.ink, borderRadius: 8, overflow: 'hidden' },
  bar: {
    height: 26,
    borderBottomWidth: 3,
    borderBottomColor: arcade.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 9,
    paddingRight: 6,
  },
  title: { flex: 1, fontSize: 12, color: arcade.ink },
  box: { width: 14, height: 14, backgroundColor: arcade.cream, borderWidth: 2, borderColor: arcade.ink },
  body: { padding: 10, gap: 6 },
});
