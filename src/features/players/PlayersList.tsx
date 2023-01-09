import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/slice";

export default function PlayersList() {
  const others = useAppSelector((state: any) => state.liveblocks.others);
  const user = useAppSelector(selectUser);

  if (others.length === 0) {
    return <div>You are alone</div>;
  }

  return (
    <div>
      There are {others.length + 1} players :{" "}
      <ul>
        <li>{user.name} (You)</li>
        {others.map((user: any, index: number) => (
          <li key={index}>
            {user.presence?.player?.name !== "" ? (
              user.presence?.player?.name
            ) : (
              <i>Waiting for name</i>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
