import { useAppSelector } from "../../app/hooks";
import { selectGuesses } from "../../app/slice";

export default function GuessList() {
  const guesses = useAppSelector(selectGuesses);

  return (
    <ul>
      {guesses.guessedWords.map((guess, index) => (
        <li key={index} style={{ color: guess.valid ? "green" : "red" }}>
          {guess.value} - {guess.guesser}
        </li>
      ))}
    </ul>
  );
}
