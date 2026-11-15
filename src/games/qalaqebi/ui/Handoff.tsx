import { View } from 'react-native';
import { InkButton } from '@/components/InkButton';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { colors } from '@/theme';

// Between turns: hides Player 1's answers while the phone changes hands.
export function Handoff({ player, onGo }: { player: number; onGo: () => void }) {
  return (
    <View style={{ paddingTop: 48, gap: 16 }}>
      <Txt style={{ fontSize: 64, textAlign: 'center' }}>📱🔄</Txt>
      <Txt weight="black" style={{ fontSize: 28, lineHeight: 40, color: colors.ink, textAlign: 'center' }}>
        {t.qalaqebi.handoffTitle(player)}
      </Txt>
      <Txt style={{ textAlign: 'center' }}>{t.qalaqebi.handoffText}</Txt>
      <InkButton title={t.qalaqebi.handoffGo} onPress={onGo} style={{ marginTop: 16 }} />
    </View>
  );
}
