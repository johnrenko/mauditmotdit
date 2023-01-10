import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
  guessWord,
  resetHasGuessed,
  selectGuesses,
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
  const others = useAppSelector((state: any) => state.liveblocks.others);

  const hasValidItem = answers.guessedWords.some(
    (item: any) => item.valid === true
  );

  useEffect(() => {
    dispatch(resetHasGuessed());
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
      dispatch(guessAnswer());
      dispatch(resetGivenTip());
      dispatch(addUserGuess(inputRef.current.value));
      inputRef.current.value = "";
      if (others.every((other: any) => other.presence.player.hasGuessed)) {
        dispatch(setEverybodyHasGuessed());
      }
    }
  };

  if (hasValidItem) {
    return <div>You win.</div>;
  }
  if (tries === 0) {
    return <div>You Failed.</div>;
  }
  if (user.hasGuessed) {
    return <div>Waiting for all users to guess a word.</div>;
  }
  return (
    <div className="inputBox">
      <input ref={inputRef} />
      <button onClick={handleClick}>Guess</button>
    </div>
  );
}
