import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectUser,
  startGame,
  launchGame,
  newAnswer,
  resetGivenTip,
  resetGuesses,
  resetTips,
  resetUser,
} from "../../app/slice";

export default function PlayersList() {
  const others = useAppSelector((state: any) => state.liveblocks.others);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      user.status === "ready" &&
      others.every((other: any) => other.presence.player.status === "ready")
    ) {
      dispatch(launchGame());
      dispatch(resetGuesses());
      dispatch(newAnswer());
      dispatch(resetTips());
      dispatch(resetGivenTip());
      dispatch(resetUser());
    }
  }, [user.status, others, dispatch]);

  if (others.length === 0) {
    return <div>You are alone</div>;
  }

  const handleClick = () => {
    dispatch(startGame());
  };

  return (
    <div>
      There are {others.length + 1} players :{" "}
      <ul>
        <li>
          {user.name} (You) - {user.status}
        </li>
        {others.map((user: any, index: number) => (
          <li key={index}>
            {user.presence?.player?.name !== "" ? (
              <>
                {user.presence?.player?.name} - {user.presence?.player?.status}
              </>
            ) : (
              <i>Waiting for name</i>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>I'm ready</button>
    </div>
  );
}
