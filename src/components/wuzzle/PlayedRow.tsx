import { Component, createSignal, Index } from "solid-js";

import playedLettersStore, { LetterState } from "./playedLettersStore";
import styles from "./PlayedRow.module.css";

export interface Letter {
  letter: string;
  occurrencesInWord: number;
  directMatches: number;
}

function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index;
}

interface Props {
  guess: string;
  word: string;
}

const PlayedRow: Component<Props> = (props) => {
  const { playedLetters, reset, updateLetter } = playedLettersStore;

  const [letterDetails, setLetterDetails] = createSignal<Letter[]>([]);

  // Analysis attempt
  const uniqueLetters = props.guess.split("").filter(onlyUnique);
  uniqueLetters.forEach((letter) => {
    const occurrencesInWord = props.word
      .split("")
      .filter((l) => l === letter).length;
    const directMatches = props.word.split("").filter((wordLetter, index) => {
      if (
        wordLetter === letter &&
        props.guess.slice(index, index + 1) === letter
      ) {
        return true;
      }
      return false;
    }).length;
    setLetterDetails((letterDetails) => [
      ...letterDetails,
      { letter, occurrencesInWord, directMatches },
    ]);
  });

  function getLetterState(index: number): "correct" | "present" | "absent" {
    const guessLetter = props.guess.slice(index, index + 1);
    let letterState: LetterState;
    // If it's a direct match then return correct
    if (props.word.slice(index, index + 1) === guessLetter) {
      letterState = "correct";
    }
    // If the letter is elsewhere in the word then check if it's already a direct match
    else if (props.word.indexOf(guessLetter) > -1) {
      if (
        letterDetails()[index]?.directMatches ===
        letterDetails()[index]?.occurrencesInWord
      ) {
        letterState = "absent";
      } else {
        letterState = "present";
      }
    } else {
      letterState = "absent";
    }
    return letterState;
  }

  return (
    <div class={styles.row}>
      <Index each={props.guess.split("")}>
        {(guessLetter, index) => (
          <div
            classList={{
              [styles.box]: true,
              [styles.letter]: true,
              [styles[getLetterState(index)]]: true,
            }}
          >
            {guessLetter()}
          </div>
        )}
      </Index>
    </div>
  );
};

export default PlayedRow;
