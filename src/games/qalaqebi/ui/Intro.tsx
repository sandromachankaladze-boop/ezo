import { View } from 'react-native';
import { InkButton } from '@/components/InkButton';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { colors } from '@/theme';

// წესები და "დავიწყოთ!" ღილაკი
export function Intro({ best, onStart }: { best: number; onStart: () => void }) {
  return (
    <>
      <Txt weight="black" style={{ fontSize: 32, color: colors.ink, lineHeight: 44 }}>
        {t.games.qalaqebi.title}
      </Txt>
      <View style={{ marginVertical: 16, gap: 8 }}>
        {t.qalaqebi.rules.map((rule) => (
          <Txt key={rule} style={{ fontSize: 16, lineHeight: 24 }}>
            {rule}
          </Txt>
        ))}
      </View>
      {best > 0 && <Txt style={{ marginBottom: 12 }}>{t.qalaqebi.yourRecord(best)}</Txt>}
      <InkButton title={t.qalaqebi.start} onPress={onStart} />
    </>
  );
}
