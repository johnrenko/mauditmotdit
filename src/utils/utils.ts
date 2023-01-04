import words from "./word-bank.json";

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getRandomNumber(): number {
  return Math.floor(Math.random() * 5) + 1;
}

export function getRandomWord(): string {
  return capitalize(
    words.valid[Math.floor(Math.random() * words.valid.length) + 1]
  );
}
