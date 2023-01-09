import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  addTip,
  selectHasGivenTips,
  selectUserIsGuessing,
} from "../../app/slice";

export default function Tips() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const hasGivenTip = useAppSelector(selectHasGivenTips);
  const isGuessing = useAppSelector(selectUserIsGuessing);

  const handleClick = () => {
    if (inputRef.current && inputRef.current.value !== "") {
      dispatch(addTip(inputRef.current.value));
      inputRef.current.value = "";
    }
  };

  if (hasGivenTip) {
    return <div>You can only give one tip.</div>;
  }
  if (!isGuessing) {
    return (
      <div className="inputBox">
        <input ref={inputRef} />
        <button onClick={handleClick}>Send tip</button>
      </div>
    );
  }
  return <></>;
}
