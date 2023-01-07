import { useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";

import { addTip, selectHasGivenTips } from "./tipsSlice";

export default function Tips() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const hasGivenTip = useSelector(selectHasGivenTips);

  const handleClick = () => {
    if (inputRef.current && inputRef.current.value !== "") {
      dispatch(addTip(inputRef.current.value));
      inputRef.current.value = "";
    }
  };

  if (hasGivenTip) {
    return <div>You can only give one tip.</div>;
  }
  return (
    <div className="inputBox">
      <input ref={inputRef} />
      <button onClick={handleClick}>Send tip</button>
    </div>
  );
}
