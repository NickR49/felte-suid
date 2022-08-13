import { Component, createSignal, Index } from "solid-js";

import playedLettersStore, { LetterState } from "./playedLettersStore";
import styles from "./PlayedRow.module.css";

interface Letter {
  letter: string;
  occurrencesInWord: number;
  directMatches: number;
}
const letterDetails: Letter[] = [];

function onlyUnique(value: string, index: number, self: string) {
  return self.indexOf(value) === index;
}

interface Props {
  guess: string;
  word: string;
}

const PlayedRow: Component<Props> = (props) => {
  const { playedLetters, reset, updateLetter } = playedLettersStore;

  function storeLetterState(letter: string, state: LetterState) {
    // console.log(`storeLetterState - letter: ${letter}, state: ${state}`);
    // Check the existing state of the letter
    // const currentState = $playedLettersStore[letter];
    const currentState = playedLetters()[letter];
    let update = false;
    if (currentState === "correct") {
      // do nothing
    } else if (currentState === "present" && state === "correct") {
      update = true;
    } else if (
      currentState === "absent" &&
      ["present", "correct"].includes(state)
    ) {
      update = true;
    } else if (!currentState) {
      update = true;
    }

    if (update) {
      //   playedLettersStore.update((playedLetters) => {
      //     // console.log(`playedLettersStore: `, { ...playedLetters, letter: state });
      //     return { ...playedLetters, [letter]: state };
      //   });
      updateLetter(letter, state);
      console.log(`playedLettersStore: `, playedLetters);
    }
  }

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
        letterDetails[index]?.directMatches ===
        letterDetails[index]?.occurrencesInWord
      ) {
        letterState = "absent";
      } else {
        letterState = "present";
      }
    } else {
      letterState = "absent";
    }
    storeLetterState(guessLetter, letterState);
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
