import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { guessWord } from "./guessSlice";
import { selectAnswerWord, guessAnswer } from "../answer/answerSlice";

export default function Guess() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const answer = useAppSelector(selectAnswerWord);

  const handleClick = () => {
    if (inputRef.current && inputRef.current.value !== "") {
      dispatch(
        guessWord({
          value: inputRef.current.value,
          valid: inputRef.current.value.toLowerCase() === answer.toLowerCase(),
        })
      );
      dispatch(guessAnswer());
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>validate</button>
    </>
  );
}
