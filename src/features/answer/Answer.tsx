import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { resetGuesses } from "../guess/guessSlice";
import { newAnswer, selectAnswerTries, selectAnswerWord } from "./answerSlice";
import { resetTips, resetGivenTip } from "../tips/tipsSlice";

export default function Answer() {
  const answer = useAppSelector(selectAnswerWord);
  const tries = useAppSelector(selectAnswerTries);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetGuesses());
    dispatch(newAnswer());
    dispatch(resetTips());
    dispatch(resetGivenTip());
  };

  return (
    <div>
      <p>{answer}</p>
      <p>{tries}</p>
      <button onClick={handleClick}>Refresh</button>
    </div>
  );
}
