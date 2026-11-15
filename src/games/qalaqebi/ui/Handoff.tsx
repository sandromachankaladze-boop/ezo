import { StyleSheet, View } from 'react-native';
import { PixelButton } from '@/components/arcade/PixelButton';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { arcade } from '@/theme';

// Between turns: hides Player 1's answers while the phone changes hands.
export function Handoff({ player, onGo }: { player: number; onGo: () => void }) {
  return (
    <View style={styles.wrap}>
      <Txt weight="pixel" style={styles.big}>
        P{player}
      </Txt>
      <Txt weight="black" style={styles.title}>
        {t.qalaqebi.handoffTitle(player)}
      </Txt>
      <Txt style={styles.text}>{t.qalaqebi.handoffText}</Txt>
      <PixelButton title={t.qalaqebi.handoffGo} onPress={onGo} style={{ alignSelf: 'stretch', marginTop: 8 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, paddingVertical: 24 },
  big: {
    fontSize: 40,
    lineHeight: 52,
    color: arcade.yellow,
    textShadowColor: arcade.orange,
    textShadowRadius: 14,
    textShadowOffset: { width: 0, height: 0 },
  },
  title: {
    fontSize: 24,
    lineHeight: 34,
    textAlign: 'center',
    color: arcade.orange,
    textShadowColor: arcade.magenta,
    textShadowRadius: 12,
    textShadowOffset: { width: 0, height: 0 },
  },
  text: { fontSize: 15, lineHeight: 22, textAlign: 'center', color: arcade.crtText },
});
