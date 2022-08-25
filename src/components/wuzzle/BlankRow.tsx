import { Component } from "solid-js";

import styles from "./BlankRow.module.css";

const BlankRow: Component = () => {
  return (
    <div class={styles.row}>
      <div class={styles.box} />
      <div class={styles.box} />
      <div class={styles.box} />
      <div class={styles.box} />
      <div class={styles.box} />
    </div>
  );
};

export default BlankRow;
