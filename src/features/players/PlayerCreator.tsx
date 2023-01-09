import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { newName, selectUser } from "../../app/slice";

export default function PlayerCreator() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current && inputRef.current.value !== "") {
      dispatch(newName(inputRef.current?.value));
    }
  };

  if (user.name !== "") {
    return <span>Your name is {user.name}</span>;
  }

  return (
    <div className="inputBox">
      <input ref={inputRef} />
      <button onClick={handleClick}>Confirm</button>
    </div>
  );
}
