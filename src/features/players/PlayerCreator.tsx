import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { newName, selectUserName } from "../../app/slice";

export default function PlayerCreator() {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectUserName);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current && inputRef.current.value !== "") {
      dispatch(newName(inputRef.current?.value));
    }
  };

  if (userName !== "") {
    return <span>Your name is {userName}</span>;
  }

  return (
    <div className="inputBox">
      <input ref={inputRef} />
      <button onClick={handleClick}>Confirm</button>
    </div>
  );
}
