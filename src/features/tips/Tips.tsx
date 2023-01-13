import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  addTip,
  resetEverybodyHasGuessed,
  selectAnswerTries,
  selectHasGivenTips,
  selectUser,
} from "../../app/slice";

export default function Tips() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const hasGivenTip = useAppSelector(selectHasGivenTips);
  const user = useAppSelector(selectUser);
  const tries = useAppSelector(selectAnswerTries);

  const handleInputKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    if (inputRef.current && inputRef.current.value !== "") {
      dispatch(addTip(inputRef.current.value));
      inputRef.current.value = "";
      dispatch(resetEverybodyHasGuessed());
    }
  };

  if (hasGivenTip) {
    return <div>You can only give one tip.</div>;
  }
  if (!user.isGuessing && tries > 0) {
    return (
      <div className="inputBox">
        <input ref={inputRef} onKeyDown={handleInputKeyDown} />
        <button onClick={handleClick}>Send tip</button>
      </div>
    );
  }
  return <></>;
}
