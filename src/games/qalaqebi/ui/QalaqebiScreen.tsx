import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { NotebookBackground } from '@/components/NotebookBackground';
import { t } from '@/i18n';
import { getBestScore, setBestScore } from '@/services/storage';
import { Category } from '../logic/categories';
import { LETTERS } from '../logic/dictionary';
import { DuelResult, scoreDuel, Turn } from '../logic/duel';
import { randomLetter, ROUND_SECONDS, RoundResult, scoreRound } from '../logic/scoring';
import { AnswerForm } from './AnswerForm';
import { DuelResultView } from './DuelResultView';
import { Handoff } from './Handoff';
import { Intro } from './Intro';
import { ResultView } from './ResultView';

const GAME_ID = 'qalaqebi';
const EMPTY: Record<Category, string> = { city: '', country: '', animal: '', thing: '' };

type Mode = 'solo' | 'duel';
// intro -> playing -> (duel only: handoff -> playing) -> result
type Phase = 'intro' | 'playing' | 'handoff' | 'result';

export default function QalaqebiScreen() {
  const [mode, setMode] = useState<Mode>('solo');
  const [phase, setPhase] = useState<Phase>('intro');
  const [player, setPlayer] = useState<0 | 1>(0); // whose turn it is in duel mode
  const [letter, setLetter] = useState(LETTERS[0]);
  const [answers, setAnswers] = useState(EMPTY);
  const [secondsLeft, setSecondsLeft] = useState(ROUND_SECONDS);
  const [firstTurn, setFirstTurn] = useState<Turn | null>(null); // Player 1's answers in duel mode
  const [soloResult, setSoloResult] = useState<RoundResult | null>(null);
  const [duelResult, setDuelResult] = useState<DuelResult | null>(null);
  const [best, setBest] = useState(0);
  const [newRecord, setNewRecord] = useState(false);

  // Best score (solo only) is stored on the phone
  useEffect(() => {
    getBestScore(GAME_ID).then(setBest);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (phase !== 'playing') return;
    if (secondsLeft <= 0) {
      finishTurn();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
    // finishTurn is recreated every second, so it is not needed in the dependency list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secondsLeft]);

  function beginTurn() {
    setAnswers(EMPTY);
    setSecondsLeft(ROUND_SECONDS);
    setPhase('playing');
  }

  function startGame(newMode: Mode) {
    setMode(newMode);
    setLetter((prev) => randomLetter(prev));
    setPlayer(0);
    setFirstTurn(null);
    setSoloResult(null);
    setDuelResult(null);
    setNewRecord(false);
    beginTurn();
  }

  function finishTurn() {
    const turn: Turn = { answers, secondsLeft: Math.max(0, secondsLeft) };

    if (mode === 'solo') {
      const r = scoreRound(letter, turn.answers, turn.secondsLeft);
      setSoloResult(r);
      setPhase('result');
      if (r.total > best) {
        setBest(r.total);
        setNewRecord(true);
        setBestScore(GAME_ID, r.total);
      }
      return;
    }

    if (player === 0) {
      // Player 1 is done: hide the answers and pass the phone
      setFirstTurn(turn);
      setPlayer(1);
      setPhase('handoff');
    } else {
      setDuelResult(scoreDuel(letter, firstTurn!, turn));
      setPhase('result');
    }
  }

  return (
    <NotebookBackground>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {phase === 'intro' && (
            <Intro best={best} onSolo={() => startGame('solo')} onDuel={() => startGame('duel')} />
          )}

          {phase === 'playing' && (
            <AnswerForm
              key={`${letter}-${player}`} // fresh form for every turn
              letter={letter}
              secondsLeft={secondsLeft}
              answers={answers}
              onChange={(category, text) => setAnswers((a) => ({ ...a, [category]: text }))}
              onDone={finishTurn}
              playerLabel={mode === 'duel' ? t.qalaqebi.player(player + 1) : undefined}
            />
          )}

          {phase === 'handoff' && <Handoff player={player + 1} onGo={beginTurn} />}

          {phase === 'result' && mode === 'solo' && soloResult && (
            <ResultView
              letter={letter}
              result={soloResult}
              best={best}
              newRecord={newRecord}
              onAgain={() => startGame('solo')}
            />
          )}

          {phase === 'result' && mode === 'duel' && duelResult && (
            <DuelResultView
              letter={letter}
              result={duelResult}
              onRematch={() => startGame('duel')}
              onSolo={() => startGame('solo')}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </NotebookBackground>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingRight: 48, paddingBottom: 60 },
});
