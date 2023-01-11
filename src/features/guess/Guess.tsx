import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
  guessWord,
  resetHasGuessed,
  selectGuesses,
  selectHasGivenTips,
  selectOthers,
  setEverybodyHasGuessed,
} from "../../app/slice";
import {
  selectAnswerWord,
  guessAnswer,
  selectAnswerTries,
} from "../../app/slice";
import { resetGivenTip } from "../../app/slice";
import { addUserGuess, selectUser } from "../../app/slice";

export default function Guess() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const answer = useAppSelector(selectAnswerWord);
  const tries = useAppSelector(selectAnswerTries);
  const answers = useAppSelector(selectGuesses);
  const user = useAppSelector(selectUser);
  const hasGivenTip = useAppSelector(selectHasGivenTips);
  const others = useAppSelector(selectOthers);

  const hasValidItem = answers.guessedWords.some(
    (item: any) => item.valid === true
  );

  useEffect(() => {
    if (answers.everybodyHasGuessed) {
      dispatch(resetHasGuessed());
      dispatch(resetGivenTip());
    }
  }, [answers.everybodyHasGuessed, dispatch]);

  const handleClick = () => {
    if (inputRef.current && inputRef.current.value !== "") {
      dispatch(
        guessWord({
          value: inputRef.current.value,
          valid: inputRef.current.value.toLowerCase() === answer.toLowerCase(),
          guesser: user.name,
        })
      );
      dispatch(addUserGuess(inputRef.current.value));
      inputRef.current.value = "";
      if (
        others
          .filter((other: any) => other.presence.player.isGuessing)
          .every((other: any) => other.presence.player.hasGuessed)
      ) {
        dispatch(setEverybodyHasGuessed());
        dispatch(guessAnswer());
      }
    }
  };

  if (hasValidItem) {
    return (
      <div>
        {answers.guessedWords
          .filter((answer) => answer.valid)
          .map((value) => value.guesser)}{" "}
        win.
      </div>
    );
  }
  if (tries === 0) {
    return <div>Perdu. Le mot était {answer}.</div>;
  }
  if (user.hasGuessed) {
    return <div>Waiting for all users to guess a word.</div>;
  }
  if (!hasGivenTip) {
    return <div>Waiting for a tip.</div>;
  }
  if(!user.isGuessing){
    return <div>You are the driver.</div>
  }
  return (
    <div className="inputBox">
      <input ref={inputRef} />
      <button onClick={handleClick}>Guess</button>
    </div>
  );
}
