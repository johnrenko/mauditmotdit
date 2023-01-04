import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { resetGuesses } from "../guess/guessSlice";
import { newAnswer, selectAnswerTries, selectAnswerWord } from "./answerSlice";

export default function Answer() {
  const answer = useAppSelector(selectAnswerWord);
  const tries = useAppSelector(selectAnswerTries);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetGuesses());
    dispatch(newAnswer());
  };

  return (
    <div>
      <p>{answer}</p>
      <p>{tries}</p>
      <button onClick={handleClick}>Refresh</button>
    </div>
  );
}
