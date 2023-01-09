import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { resetGuesses, selectUserIsGuessing } from "../../app/slice";
import {
  newAnswer,
  selectAnswerTries,
  selectAnswerWord,
} from "../../app/slice";
import { resetTips, resetGivenTip } from "../../app/slice";
import "./Answer.css";
import { resetUser } from "../../app/slice";

export default function Answer() {
  const answer = useAppSelector(selectAnswerWord);
  const tries = useAppSelector(selectAnswerTries);
  const isGuessing = useAppSelector(selectUserIsGuessing);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetGuesses());
    dispatch(newAnswer());
    dispatch(resetTips());
    dispatch(resetGivenTip());
    dispatch(resetUser());
  };

  if (!isGuessing) {
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
  } else {
    return <div>You are not the driver.</div>
  }
}
