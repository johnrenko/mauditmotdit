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
import {
  isDriver,
  isGuesser,
  selectDriver,
  selectGameStatus,
  selectOthers,
  selectUser,
} from "./app/slice";

function App() {
  const dispatch = useAppDispatch();
  const connection = useAppSelector(
    (state: any) => state.liveblocks.isStorageLoading
  );
  const user = useAppSelector(selectUser);
  const gameStatus = useAppSelector(selectGameStatus);
  const driver = useAppSelector(selectDriver);
  const others = useAppSelector(selectOthers);

  useEffect(() => {
    dispatch(actions.enterRoom("room-id"));

    return () => {
      dispatch(actions.leaveRoom("room-id"));
    };
  }, [dispatch]);

  useEffect(() => {
    if (driver?.id === user.id) {
      dispatch(isDriver());
    } else {
      dispatch(isGuesser());
    }
  }, [driver, user, dispatch]);

  useEffect(() => {
    console.log("Someone left", others);
    if (
      user.id !== driver?.id &&
      others.some((other: any) => other.presence.id !== driver?.id)
    ) {
      console.log("no more driver");
    }
  }, [others, driver?.id, user, dispatch]);

  if (connection) {
    return <div>Loading please wait...</div>;
  }

  return (
    <div className="App">
      {gameStatus !== "started" ? (
        <div className="container">
          <h2>Users</h2>
          {user.name === "" ? <PlayerCreator /> : <PlayersList />}
        </div>
      ) : null}

      {gameStatus === "started" ? (
        <>
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
        </>
      ) : null}
    </div>
  );
}

export default App;
