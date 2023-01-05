import React, { useEffect } from "react";
import "./App.css";

import { actions } from "@liveblocks/redux";

import { useAppDispatch } from "./app/hooks";
import Answer from "./features/answer/Answer";
import Guess from "./features/guess/Guess";
import GuessList from "./features/guess/GuessList";
import Tips from "./features/tips/Tips";
import TipsList from "./features/tips/TipsList";
import PlayersList from "./features/players/PlayersList";
import { useSelector } from "react-redux";
import PlayerCreator from "./features/players/PlayerCreator";

function App() {
  const dispatch = useAppDispatch();
  const connection = useSelector(
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
      <div>
        <h1>Users</h1>
        <PlayerCreator />
        <PlayersList />
      </div>

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
