import { Modal, StyleSheet, View } from 'react-native';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { arcade } from '@/theme';
import { PixelButton } from './PixelButton';

// One-time "passengers only" card, shown on first launch (driver safety, see PLAN.md).
export function SafetyCard({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.window} accessibilityViewIsModal>
          <View style={styles.titleBar}>
            <Txt weight="black" style={styles.title}>
              {t.safety.title}
            </Txt>
            <View style={styles.close} />
          </View>
          <View style={styles.body}>
            <Txt style={styles.text}>{t.safety.text}</Txt>
            <PixelButton title={t.safety.ok} onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(13,8,32,0.8)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  window: {
    width: '100%',
    maxWidth: 360,
    borderWidth: 3,
    borderColor: arcade.ink,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: arcade.cream,
  },
  titleBar: {
    height: 30,
    backgroundColor: arcade.red,
    borderBottomWidth: 3,
    borderBottomColor: arcade.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 8,
  },
  title: { fontSize: 14, color: arcade.cream },
  close: { width: 14, height: 14, backgroundColor: arcade.cream, borderWidth: 2, borderColor: arcade.ink },
  body: { padding: 16, gap: 16 },
  text: { fontSize: 15, lineHeight: 23, color: arcade.ink },
});
