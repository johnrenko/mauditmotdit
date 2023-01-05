import { useRef } from "react";
import { useAppDispatch } from "../../app/hooks";

import { addTip } from "./tipsSlice";

export default function Tips() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current && inputRef.current.value !== "") {
      dispatch(addTip(inputRef.current.value));
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Send</button>
    </>
  );
}
