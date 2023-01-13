import React, { useEffect } from "react";
import "./App.css";
import logo from "./static/Logo_shadow.svg";
import BG_Top from "./static/BG_Top.svg";
import BG_Bottom from "./static/BG_Back.svg";

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
  selectUser,
} from "./app/slice";
import { generateRandomString } from "./utils/utils";

function App() {
  const dispatch = useAppDispatch();
  const connection = useAppSelector(
    (state: any) => state.liveblocks.isStorageLoading
  );
  const user = useAppSelector(selectUser);
  const gameStatus = useAppSelector(selectGameStatus);
  const driver = useAppSelector(selectDriver);

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const room = params.get("room") || generateRandomString(10).toString();
  params.set("room", room);
  window.history.pushState({}, "", url.href);

  useEffect(() => {
    dispatch(actions.enterRoom(room));

    return () => {
      dispatch(actions.leaveRoom(room));
    };
  }, [room, dispatch]);

  useEffect(() => {
    if (driver?.id === user.id) {
      dispatch(isDriver());
    } else {
      dispatch(isGuesser());
    }
  }, [driver, user, dispatch]);

  if (connection) {
    return <div>Loading please wait...</div>;
  }

  return (
    <div className="App">
      <img src={logo} alt="Logo" className="logo"/>
      {gameStatus !== "started" ? (
        <div className="container">
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
       <img src={BG_Top} alt="BG_Top" className="BG_Top"/>
        <img src={BG_Bottom} alt="BG_Bottom" className="BG_Bottom"/>
    </div>
  );
}

export default App;
