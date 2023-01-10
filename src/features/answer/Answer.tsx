import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  newDriver,
  resetGuesses,
  selectDriver,
  selectOthers,
  selectUser,
} from "../../app/slice";
import {
  newAnswer,
  selectAnswerTries,
  selectAnswerWord,
} from "../../app/slice";
import { resetTips, resetGivenTip } from "../../app/slice";
import "./Answer.css";
import { resetUser } from "../../app/slice";
import { getRandomNumber } from "../../utils/utils";

export default function Answer() {
  const answer = useAppSelector(selectAnswerWord);
  const tries = useAppSelector(selectAnswerTries);
  const user = useAppSelector(selectUser);
  const others = useAppSelector(selectOthers);
  const driver = useAppSelector(selectDriver);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetGuesses());
    dispatch(newAnswer());
    dispatch(resetTips());
    dispatch(resetGivenTip());
    dispatch(resetUser());

    const playersList = [
      { name: user.name, id: user.id },
      ...others.map((other: any) => {
        return {
          name: other.presence.player.name,
          id: other.presence.player.id,
        };
      }),
    ];

    dispatch(newDriver(playersList[getRandomNumber(playersList.length) - 1]));
  };

  if (!user.isGuessing) {
    return (
      <div className="answerBox">
        <h2>Mot à deviner</h2>
        <div className="answerContainer">
          <div className="value">
            <span className="answer">{answer}</span>
            <span className="tries">{tries}</span>
          </div>
          <button onClick={handleClick}>Next round</button>
        </div>
      </div>
    );
  } else {
    return <div>{driver?.name} is the driver.</div>;
  }
}
