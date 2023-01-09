import { useAppSelector } from "../../app/hooks";
import { selectTipsValue } from "../../app/slice";

export default function TipsList() {
  const tips = useAppSelector(selectTipsValue);

  return (
    <ul>
      {tips.map((tip, index) => (
        <li key={index}>{tip}</li>
      ))}
    </ul>
  );
}
