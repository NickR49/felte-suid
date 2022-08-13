import { Component, createSignal, Index } from "solid-js";
import styles from "./CurrentRow.module.css";

const CurrentRow: Component = () => {
  // const guess = ['', '', '', '', ''];
  const [guess] = createSignal(["", "", "", "", ""]);

  function handleKeyInput(event: KeyboardEvent) {
    // Only show the last pressed letter
    const target = event.target as HTMLInputElement;
    const input = event.key;
    if (input.length === 1) {
      target.value = input;
    }
  }

  return (
    <>
      <div class={styles.row}>
        <Index each={guess()}>
          {(letter, index) => (
            <input
              class={styles.letter}
              type="text"
              value={letter()}
              autofocus={index === 0}
              onKeyUp={handleKeyInput}
              data-index={index}
            />
          )}
        </Index>
      </div>
    </>
  );
};

export default CurrentRow;
