import { View } from 'react-native';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { colors } from '@/theme';

export function Timer({ seconds }: { seconds: number }) {
  const danger = seconds <= 10;
  return (
    <View style={{ alignItems: 'flex-end' }}>
      <Txt weight="black" style={{ fontSize: 44, lineHeight: 56, color: danger ? colors.red : colors.ink }}>
        {seconds}
      </Txt>
      <Txt style={{ color: colors.muted }}>{t.qalaqebi.seconds}</Txt>
    </View>
  );
}
