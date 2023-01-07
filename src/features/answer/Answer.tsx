import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { resetGuesses } from "../guess/guessSlice";
import { newAnswer, selectAnswerTries, selectAnswerWord } from "./answerSlice";
import { resetTips, resetGivenTip } from "../tips/tipsSlice";
import "./Answer.css";
import { resetUser } from "../players/playerSlice";

export default function Answer() {
  const answer = useAppSelector(selectAnswerWord);
  const tries = useAppSelector(selectAnswerTries);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetGuesses());
    dispatch(newAnswer());
    dispatch(resetTips());
    dispatch(resetGivenTip());
    dispatch(resetUser());
  };

  return (
    <div className="answerBox">
      <h2>Mot à deviner</h2>
      <div className="answerContainer">
        <div className="value">
          <span className="answer">{answer}</span>
          <span className="tries">{tries}</span>
        </div>
        <button onClick={handleClick}>Refresh</button>
      </div>
    </div>
  );
}
