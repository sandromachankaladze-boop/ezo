import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NotebookBackground } from '@/components/NotebookBackground';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { ROUTES } from '@/navigation/routes';
import { colors } from '@/theme';

type Game = {
  id: keyof typeof t.games;
  emoji: string;
  route?: typeof ROUTES.qalaqebi; // no route = game not ready yet
};

const GAMES: Game[] = [
  { id: 'qalaqebi', emoji: '🏙️', route: ROUTES.qalaqebi },
  { id: 'battleship', emoji: '🚢' },
  { id: 'arcade', emoji: '🧱' },
];

export default function HomeScreen() {
  return (
    <NotebookBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          <Txt weight="black" style={styles.logo}>
            {t.home.title}
          </Txt>
          <Txt style={styles.subtitle}>{t.home.subtitle}</Txt>

          <View style={styles.list}>
            {GAMES.map((g) => {
              const ready = !!g.route;
              const text = t.games[g.id];
              return (
                <Pressable
                  key={g.id}
                  disabled={!ready}
                  onPress={() => g.route && router.push(g.route)}
                  style={({ pressed }) => [styles.card, !ready && styles.cardSoon, pressed && styles.cardPressed]}>
                  <Txt style={styles.emoji}>{g.emoji}</Txt>
                  <View style={{ flex: 1 }}>
                    <Txt weight="bold" style={styles.cardTitle}>
                      {text.title}
                    </Txt>
                    <Txt style={styles.cardDesc}>{text.desc}</Txt>
                  </View>
                  {!ready && (
                    <View style={styles.soonBadge}>
                      <Txt weight="bold" style={styles.soonText}>
                        {t.common.soon}
                      </Txt>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.driver}>
            <Txt weight="bold" style={{ color: colors.red, fontSize: 15 }}>
              {t.home.driverTitle}
            </Txt>
            <Txt style={{ fontSize: 14, marginTop: 4 }}>
              {t.home.driverText}
            </Txt>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NotebookBackground>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingRight: 48, paddingTop: 36 },
  logo: { fontSize: 56, color: colors.ink, lineHeight: 72 },
  subtitle: { fontSize: 17, marginBottom: 24 },
  list: { gap: 14 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 16,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  cardSoon: { borderColor: colors.muted, shadowColor: colors.muted, opacity: 0.75 },
  cardPressed: { transform: [{ translateY: 3 }] },
  emoji: { fontSize: 34 },
  cardTitle: { fontSize: 20, color: colors.ink },
  cardDesc: { fontSize: 14, color: colors.muted },
  soonBadge: { backgroundColor: colors.sticker, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  soonText: { fontSize: 12, color: colors.pencil },
  driver: {
    marginTop: 28,
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.red,
    backgroundColor: '#FFF5F5',
  },
});
