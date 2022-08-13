import {
  Component,
  createMemo,
  createSignal,
  For,
  Index,
  Show,
} from "solid-js";
import { createStore } from "solid-js/store";

import PlayedRow from "../components/wuzzle/PlayedRow";
import { nonSolutions } from "../components/wuzzle/nonSolutions";
import { solutions } from "../components/wuzzle/solutions";
import { daysBetween } from "../utils/dateUtils";
import BlankRow from "../components/wuzzle/BlankRow";
import playedLettersStore from "../components/wuzzle/playedLettersStore";
import styles from "./Wuzzle.module.css";

export const dictionary = [...nonSolutions, ...solutions];

const Wuzzle: Component = () => {
  const { playedLetters, reset } = playedLettersStore;

  // Look up the word of the day
  const solutionIndex = daysBetween(new Date("2021-06-19"), new Date());
  const word = solutions[solutionIndex];

  console.log(`solutionIndex: `, solutionIndex);
  console.log(`word: `, word);

  // let gameState: "PLAYING" | "WON" | "LOST" = "PLAYING";
  const [gameState, setGameState] = createSignal<"PLAYING" | "WON" | "LOST">(
    "PLAYING"
  );

  // Guesses
  // const guesses: string[] = [];
  const [guesses, setGuesses] = createSignal<string[]>([]);
  // let guessIndex = 0;
  const [guessIndex, setGuessIndex] = createSignal(0);

  // $: previousGuesses = guesses.slice(0, guessIndex);
  const previousGuesses = createMemo(() => guesses().slice(0, guessIndex()));

  // Current guess
  const currentGuess = ["", "", "", "", ""];
  let guessLetterIndex = 0;

  return (
    <div>
      <h1>Wuzzle</h1>

      <br />

      <div class={styles.board}>
        <Index each={previousGuesses()}>
          {(guess) => <PlayedRow guess={guess()} word={word} />}
        </Index>

        <Show when={guessIndex() < 6}>
          <Show when={gameState() === "PLAYING"}>
            <div class={styles.row}>
              {/* <CurrentRow word={word} /> */}
              <Index each={currentGuess}>
                {(letter, index) => (
                  <div
                    // classList={{ [styles.box]: true, [styles.letter]: true }}
                    class={`${styles.box} ${styles.letter}`}
                  >
                    {letter()}
                  </div>
                )}
              </Index>
            </div>
          </Show>

          <Show when={gameState() === "WON" && guessIndex() < 6}>
            <BlankRow />
          </Show>

          <Index each={Array(5 - guessIndex())}>{(_) => <BlankRow />}</Index>
        </Show>
      </div>

      <br />
      <br />

      <p>Guess index: {guessIndex()}</p>
      <p>Guess letter index: {guessLetterIndex}</p>
      <p>Current guess: {currentGuess.join("")}</p>
      <p>Previous guesses: {JSON.stringify(previousGuesses())}</p>
      {/* <p>Show won modal: {showWonModal}</p>
<p>Show lost modal: {showLostModal}</p>  */}

      {/* <Keyboard
	layout="wordle"
	on:keydown={handleKeyboardKeydown}
	--text-transform="uppercase"
	--background="darkgrey"
	noSwap={['Enter']}
	custom=""
	keyClass={$playedLettersStore}
/> */}
    </div>
  );
};

export default Wuzzle;
