import { useAppSelector } from "../../app/hooks";
import { selectGuessAnswers } from "../guess/guessSlice";

export default function GuessList() {
  const guesses = useAppSelector(selectGuessAnswers);

  return (
    <ul>
      {guesses.map((guess, index) => (
        <li key={index} style={{ color: guess.valid ? "green" : "red" }}>
          {guess.value}
        </li>
      ))}
    </ul>
  );
}
