import React from "react";
import "./App.css";
import Answer from "./features/answer/Answer";
import Guess from "./features/guess/Guess";
import GuessList from "./features/guessList/GuessList";

function App() {
  return (
    <div className="App">
      <Answer />
      <Guess />
      <GuessList />
    </div>
  );
}

export default App;
