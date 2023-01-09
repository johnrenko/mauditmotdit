import words from "./word-bank.json";

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getRandomNumber(x: number): number {
  return Math.floor(Math.random() * x) + 1;
}

export function getRandomWord(): string {
  return capitalize(words[Math.floor(Math.random() * words.length) + 1]);
}

export function stripAccents(str: string) {
  return str
    .replace(/[àáâãäåâ]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ýÿ]/g, "y")
    .replace(/[çćč]/g, "c");
}
