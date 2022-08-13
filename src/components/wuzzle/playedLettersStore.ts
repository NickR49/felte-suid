import { createSignal, createMemo, createRoot } from "solid-js";

export type LetterState = "correct" | "present" | "absent";

function createPlayedLetters() {
  const [playedLetters, setPlayedLetters] = createSignal<{
    [letter: string]: LetterState;
  }>({});
  const updateLetter = (letter: string, state: LetterState) =>
    setPlayedLetters((playedLetters) => ({
      ...playedLetters,
      [letter]: state,
    }));
  const reset = () => setPlayedLetters({});
  return { playedLetters, setPlayedLetters, updateLetter, reset };
}

export default createRoot(createPlayedLetters);
