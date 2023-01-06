import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { guessWord, selectGuessAnswers } from "./guessSlice";
import {
  selectAnswerWord,
  guessAnswer,
  selectAnswerTries,
} from "../answer/answerSlice";
import { resetGivenTip } from "../tips/tipsSlice";
import { addGuess } from "../players/playerSlice";

export default function Guess() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const answer = useAppSelector(selectAnswerWord);
  const tries = useAppSelector(selectAnswerTries);
  const answers = useAppSelector(selectGuessAnswers);

  const hasValidItem = answers.some((item) => item.valid === true);

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
      dispatch(addGuess(inputRef.current.value))
      inputRef.current.value = "";
    }
  };

  if (hasValidItem) {
    return <div>You win.</div>;
  }
  if (tries === 0) {
    return <div>You Failed.</div>;
  }
  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>validate</button>
    </>
  );
}
