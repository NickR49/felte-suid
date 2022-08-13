import { Link, Route, Routes } from "solid-app-router";
import { Component, lazy } from "solid-js";

import styles from "./App.module.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

const About = lazy(() => import("./pages/About.jsx"));
const Wuzzle = lazy(() => import("./pages/Wuzzle.jsx"));

const App: Component = () => {
  return (
    <div class={styles.App}>
      {/* <header class={styles.header}> */}
      <header
        style={{
          display: "flex",
          "flex-direction": "row",
          "justify-content": "space-evenly",
        }}
      >
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/about">About</Link>
        <Link href="/wuzzle">Wuzzle</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/wuzzle" element={<Wuzzle />} />
      </Routes>
    </div>
  );
};

export default App;
