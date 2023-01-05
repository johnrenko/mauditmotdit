import { useAppSelector } from "../../app/hooks";
import { selectTips } from "./tipsSlice";

export default function TipsList() {
  const tips = useAppSelector(selectTips);

  return (
    <ul>
      {tips.values.map((tip, index) => (
        <li key={index}>{tip}</li>
      ))}
    </ul>
  );
}
