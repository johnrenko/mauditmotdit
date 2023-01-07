import React, { useEffect } from "react";
import "./App.css";

import { actions } from "@liveblocks/redux";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import Answer from "./features/answer/Answer";
import Guess from "./features/guess/Guess";
import GuessList from "./features/guess/GuessList";
import Tips from "./features/tips/Tips";
import TipsList from "./features/tips/TipsList";
import PlayersList from "./features/players/PlayersList";
import PlayerCreator from "./features/players/PlayerCreator";

function App() {
  const dispatch = useAppDispatch();
  const connection = useAppSelector(
    (state: any) => state.liveblocks.isStorageLoading
  );

  useEffect(() => {
    dispatch(actions.enterRoom("room-id"));

    return () => {
      dispatch(actions.leaveRoom("room-id"));
    };
  }, [dispatch]);

  if (connection) {
    return <div>Loading please wait...</div>;
  }

  return (
    <div className="App">
      <div className="container">
        <h2>Users</h2>
        <PlayerCreator />
        <PlayersList />
      </div>

      <div className="answerHighLevel">
        <Answer />
      </div>

      <div className="container">
        <h2>Words guessed</h2>
        <Guess />
        <GuessList />
      </div>

      <div className="container">
        <h2>Tips given</h2>
        <Tips />
        <TipsList />
      </div>
    </div>
  );
}

export default App;
