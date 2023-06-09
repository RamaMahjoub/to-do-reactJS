import { Tokens } from "../apis/AuthServices";

const USER_KEY = 'user';

export function getStoredUser(): Tokens | null {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredUser(tokens: Tokens): void {
  localStorage.setItem(USER_KEY, JSON.stringify(tokens));
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_KEY);
}