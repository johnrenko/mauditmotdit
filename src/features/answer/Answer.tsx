import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { newAnswer, selectAnswerTries, selectAnswerWord } from "./answerSlice";

export default function Answer() {
  const answer = useAppSelector(selectAnswerWord);
  const tries = useAppSelector(selectAnswerTries);
  const dispatch = useAppDispatch();


  return (
    <div>
      <p>{answer}</p>
      <p>{tries}</p>
      <button onClick={() => dispatch(newAnswer())}>Refresh</button>
    </div>
  );
}
