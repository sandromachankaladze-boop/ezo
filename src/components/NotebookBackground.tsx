import { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native';
import { CELL, colors } from '@/theme';

// Screen background: notebook grid with a red margin line.
export function NotebookBackground({ children, style, ...rest }: ViewProps) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ w: width, h: height });
  };

  const cols = Math.ceil(size.w / CELL);
  const rows = Math.ceil(size.h / CELL);

  return (
    <View style={[styles.root, style]} onLayout={onLayout} {...rest}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {Array.from({ length: cols }, (_, i) => (
          <View key={`c${i}`} style={[styles.vLine, { left: i * CELL }]} />
        ))}
        {Array.from({ length: rows }, (_, i) => (
          <View key={`r${i}`} style={[styles.hLine, { top: i * CELL }]} />
        ))}
        <View style={styles.margin} />
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  vLine: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: colors.grid },
  hLine: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: colors.grid },
  margin: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: CELL * 1.5,
    width: 2,
    backgroundColor: colors.margin,
  },
});
