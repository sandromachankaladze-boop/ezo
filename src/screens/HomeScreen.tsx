import { router, useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '@/components/arcade/BottomNav';
import { CoinDoor } from '@/components/arcade/CoinDoor';
import { ControlDeck } from '@/components/arcade/ControlDeck';
import { CrtScreen } from '@/components/arcade/CrtScreen';
import { Marquee } from '@/components/arcade/Marquee';
import { PixelIcon } from '@/components/arcade/PixelIcon';
import { SafetyCard } from '@/components/arcade/SafetyCard';
import { YardBackground } from '@/components/arcade/YardBackground';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { ROUTES } from '@/navigation/routes';
import { getBestScore, getFlag, setFlag } from '@/services/storage';
import { arcade } from '@/theme';

type Game = {
  id: keyof typeof t.games;
  route?: typeof ROUTES.qalaqebi; // no route = game not ready yet
};

const GAMES: Game[] = [{ id: 'qalaqebi', route: ROUTES.qalaqebi }, { id: 'battleship' }, { id: 'arcade' }];

export default function HomeScreen() {
  const [sel, setSel] = useState(0);
  const [best, setBest] = useState(0);
  const [showSafety, setShowSafety] = useState(false);

  // Refresh the record every time we come back to the home screen
  useFocusEffect(
    useCallback(() => {
      getBestScore('qalaqebi').then(setBest);
    }, []),
  );

  // First launch: show the "passengers only" card once
  useEffect(() => {
    getFlag('safetySeen').then((seen) => !seen && setShowSafety(true));
  }, []);

  const selected = GAMES[sel];
  const ready = !!selected.route;

  function open(game: Game) {
    if (game.route) router.push(game.route);
  }

  function pick(i: number) {
    // first tap selects, second tap on a ready game opens it
    if (i === sel) open(GAMES[i]);
    else setSel(i);
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <YardBackground />
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.cabinet}>
          <Marquee />
          <CrtScreen>
            <View style={styles.hud}>
              <View style={styles.hudItem} accessible accessibilityLabel={`${t.arcade.record}: ${best}`}>
                <PixelIcon name="star" size={18} />
                <Txt weight="pixel" style={styles.hudNum}>
                  {best}
                </Txt>
              </View>
            </View>

            <Txt weight="bold" style={styles.choose}>
              {t.arcade.chooseGame}
            </Txt>

            <View accessibilityRole="radiogroup" style={{ gap: 6 }}>
              {GAMES.map((g, i) => {
                const isSel = i === sel;
                const isReady = !!g.route;
                const color = isSel ? (isReady ? arcade.green : arcade.cream) : arcade.muted;
                return (
                  <Pressable
                    key={g.id}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: isSel }}
                    onPress={() => pick(i)}
                    style={[
                      styles.row,
                      isSel && (isReady ? styles.rowReady : styles.rowSoon),
                    ]}>
                    <View style={styles.cursor}>{isSel && <PixelIcon name="cursor" size={18} />}</View>
                    <Txt weight="black" style={[styles.gameTitle, { color }]} numberOfLines={1}>
                      {t.games[g.id].title}
                    </Txt>
                    {!isReady && (
                      <View accessible accessibilityLabel={t.common.soon}>
                        <PixelIcon name="lock" size={16} />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>

            <Txt style={styles.hint}>{ready ? t.arcade.hintReady : t.arcade.hintSoon}</Txt>
          </CrtScreen>
          <ControlDeck
            onUp={() => setSel((s) => (s + GAMES.length - 1) % GAMES.length)}
            onDown={() => setSel((s) => (s + 1) % GAMES.length)}
            onOk={() => open(selected)}
            okEnabled={ready}
          />
          <CoinDoor />
        </View>
      </SafeAreaView>
      <BottomNav active="home" />

      <SafetyCard
        visible={showSafety}
        onClose={() => {
          setShowSafety(false);
          setFlag('safetySeen');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: arcade.night },
  safe: { flex: 1 },
  cabinet: { flex: 1, marginHorizontal: 22, marginTop: 30 },
  hud: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hudItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  hudNum: { fontSize: 10, color: arcade.yellow },
  choose: { fontSize: 13, color: arcade.orange, letterSpacing: 0.5 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    minHeight: 44,
  },
  rowReady: { backgroundColor: 'rgba(76,201,76,0.12)', borderWidth: 2, borderColor: arcade.green },
  rowSoon: { backgroundColor: 'rgba(255,210,63,0.08)', borderWidth: 2, borderColor: arcade.yellow },
  cursor: { width: 12 },
  gameTitle: { flex: 1, fontSize: 18, lineHeight: 26 },
  hint: { marginTop: 'auto', textAlign: 'center', fontSize: 11, color: arcade.crtText },
});
