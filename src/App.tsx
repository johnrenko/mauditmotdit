import React from "react";
import "./App.css";
import Answer from "./features/answer/Answer";
import Guess from "./features/guess/Guess";
import GuessList from "./features/guess/GuessList";
import Tips from "./features/tips/Tips";
import TipsList from "./features/tips/TipsList";

function App() {
  return (
    <div className="App">
      <div>
        <h1>Answer to guess</h1>
        <Answer />
      </div>

      <div>
        <h1>Words guessed</h1>
        <Guess />
        <GuessList />
      </div>

      <div>
        <h1>Tips given</h1>
        <Tips />
        <TipsList />
      </div>
    </div>
  );
}

export default App;
