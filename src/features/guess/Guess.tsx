import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { guessWord, selectGuessAnswers } from "../../app/slice";
import {
  selectAnswerWord,
  guessAnswer,
  selectAnswerTries,
} from "../../app/slice";
import { resetGivenTip } from "../../app/slice";
import { addUserGuess, selectUserHasGuessed } from "../../app/slice";

export default function Guess() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const answer = useAppSelector(selectAnswerWord);
  const tries = useAppSelector(selectAnswerTries);
  const answers = useAppSelector(selectGuessAnswers);
  const userHasGuessed = useAppSelector(selectUserHasGuessed);

  const hasValidItem = answers.some((item:any) => item.valid === true);

  const handleClick = () => {
    if (inputRef.current && inputRef.current.value !== "") {
      dispatch(
        guessWord({
          value: inputRef.current.value,
          valid: inputRef.current.value.toLowerCase() === answer.toLowerCase(),
        })
      );
      dispatch(guessAnswer());
      dispatch(resetGivenTip());
      dispatch(addUserGuess(inputRef.current.value));
      inputRef.current.value = "";
    }
  };

  if (hasValidItem) {
    return <div>You win.</div>;
  }
  if (tries === 0) {
    return <div>You Failed.</div>;
  }
  if (userHasGuessed) {
    return <div>Waiting for all users to guess a word.</div>;
  }
  return (
    <div className="inputBox">
      <input ref={inputRef} />
      <button onClick={handleClick}>Guess</button>
    </div>
  );
}
