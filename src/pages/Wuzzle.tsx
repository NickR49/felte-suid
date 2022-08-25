import {
  Component,
  createMemo,
  createSignal,
  For,
  Index,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import Modal from "@suid/material/Modal";
import Paper from "@suid/material/Paper";

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

  const [gameState, setGameState] = createSignal<"PLAYING" | "WON" | "LOST">(
    "PLAYING"
  );

  // Guesses
  const [guesses, setGuesses] = createSignal<string[]>([]);
  const [guessIndex, setGuessIndex] = createSignal(0);
  const [showWonModal, setShowWonModal] = createSignal(false);
  const [showLostModal, setShowLostModal] = createSignal(false);
  const [showInvalidWordModal, setShowInvalidWordModal] = createSignal(false);

  const previousGuesses = createMemo(() => guesses().slice(0, guessIndex()));

  // Current guess
  const [currentGuess, setCurrentGuess] = createSignal(["", "", "", "", ""]);
  const [guessLetterIndex, setGuessLetterIndex] = createSignal(0);

  onMount(() => window.addEventListener("keydown", handleWindowKeydown));
  onCleanup(() => window.removeEventListener("keydown", handleWindowKeydown));

  function handleKeydown(key: string) {
    switch (key) {
      case "Backspace":
        if (guessLetterIndex() > 0) {
          setGuessLetterIndex((i) => i - 1);
          currentGuess()[guessLetterIndex()] = "";
        }
        break;
      case "Enter":
        if (guessLetterIndex() === 5) {
          const guessWord = currentGuess().join("").toLowerCase();

          if (dictionary.includes(guessWord)) {
            guesses()[guessIndex()] = guessWord;
            setGuessLetterIndex(0);
            for (let i = 0; i < 5; i++) {
              // currentGuess[i] = "";
              setCurrentGuess((currentGuess) => {
                const guess = [...currentGuess];
                guess[i] = "";
                return guess;
              });
            }
            setGuessIndex((i) => i + 1);
            if (guessWord === word) {
              setGameState("WON");
              setShowWonModal(true);
            } else {
              if (guessIndex() === 6) {
                setGameState("LOST");
                setShowLostModal(true);
              }
            }
          } else {
            setShowInvalidWordModal(true);
          }
        }
        break;
      default:
        if (/^[a-zA-Z]$/.test(key) && guessLetterIndex() < 5) {
          console.log(`Got letter `, key);
          // currentGuess[guessLetterIndex] = key.toLowerCase();
          setCurrentGuess((currentGuess) => {
            const guess = [...currentGuess];
            guess[guessLetterIndex()] = key.toLowerCase();
            return guess;
          });
          setGuessLetterIndex((i) => i + 1);
        }
    }
  }

  function handleWindowKeydown(event: KeyboardEvent) {
    console.log(`handleWindowKeydown - `, event.key);
    event.preventDefault();
    handleKeydown(event.key);
  }

  let remarkIndex = -1;
  function wittism() {
    const guessWord = currentGuess().join("").toLowerCase();
    const remark = [
      `That word doesn't appear to be in the dictionary`,
      `No, not that one either`,
      `Nice try, perhaps next time . . .`,
      `Nope, not even close`,
      `Hmmmmm, where art thou '${guessWord}'?`,
      `This ain't urban dictionary buddy`,
      `Yeah nah . . .`,
      `Perhaps another game might suit you better?`,
      `Tiddly winks perhaps?`,
      `This is not the Klingon version!`,
    ];
    remarkIndex = (remarkIndex + 1) % remark.length;
    return remark[remarkIndex];
  }

  function userRating() {
    const scale = [
      "Genius",
      "Amazing",
      "Well done",
      "Not bad",
      "Good effort",
      `Points for trying`,
    ];
    return scale[guessIndex() - 1];
  }

  return (
    <div onKeyDown={handleWindowKeydown}>
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
              <Index each={currentGuess()}>
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
      <p>Current guess: {currentGuess().join("")}</p>
      <p>Previous guesses: {JSON.stringify(previousGuesses())}</p>
      <p>Letter state: {JSON.stringify(playedLetters())}</p>
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

      <Modal
        open={showInvalidWordModal()}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper sx={{ width: 400, height: 300, padding: 4 }}>
          <h2 slot="header">{wittism()}</h2>
          <button onClick={() => setShowInvalidWordModal(false)}>Close</button>
        </Paper>
      </Modal>
      <Modal open={showWonModal()}>
        <h1>{userRating()}</h1>
        <h2 slot="header">
          You won in {guessIndex} move{guessIndex() === 1 ? "" : "s"}
          <Index each={Array(6 - guessIndex())}>{() => "!"}</Index>
        </h2>
        <button onClick={() => setShowWonModal(false)}>Close</button>
      </Modal>
      <Modal open={showLostModal()}>
        <h2 slot="header">
          I'm dreadfully sorry but it appears that you have lost!!!
        </h2>
        <button onClick={() => setShowLostModal(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default Wuzzle;
