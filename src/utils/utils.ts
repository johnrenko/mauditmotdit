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

export function generateUniqueId() {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0].toString();
}

export function generateRandomString(length: number) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
