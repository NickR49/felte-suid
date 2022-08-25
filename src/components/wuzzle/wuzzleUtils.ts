import { LetterState } from "./playedLettersStore";
import { Letter } from "./PlayedRow";

/**
 *
 */
// export function getLetterState(index: number): "correct" | "present" | "absent" {
//     const guessLetter = props.guess.slice(index, index + 1);
//     let letterState: LetterState;
//     // If it's a direct match then return correct
//     if (props.word.slice(index, index + 1) === guessLetter) {
//       letterState = "correct";
//     }
//     // If the letter is elsewhere in the word then check if it's already a direct match
//     else if (props.word.indexOf(guessLetter) > -1) {
//       if (
//         letterDetails[index]?.directMatches ===
//         letterDetails[index]?.occurrencesInWord
//       ) {
//         letterState = "absent";
//       } else {
//         letterState = "present";
//       }
//     } else {
//       letterState = "absent";
//     }
//     storeLetterState(guessLetter, letterState); // Why the heck is this happening here?
//     return letterState;
//   }

function checkLetter(
  word: string,
  guessLetter: string,
  index: number,
  letterDetails: Letter[]
): "correct" | "present" | "absent" {
  let letterState: LetterState;
  // If it's a direct match then return correct
  if (word.slice(index, index + 1) === guessLetter) {
    letterState = "correct";
  }
  // If the letter is elsewhere in the word then check if it's already a direct match
  else if (word.indexOf(guessLetter) > -1) {
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
  return letterState;
}

/**
 *
 */
export function checkAttempt(
  word: string,
  guess: string,
  letterDetails: Letter[]
): { [letter: string]: LetterState } {
  const result = Object.fromEntries(
    guess
      .split("")
      .map((guessLetter, index) => [
        guessLetter,
        checkLetter(word, guessLetter, index, letterDetails),
      ])
  );

  return result;
}
