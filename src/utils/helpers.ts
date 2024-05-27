// get item from local storage
export function getLocalStorage(key: string): any | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function setLocalStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export const formatCreatedAt = (date: string) => new Date(date).toUTCString();