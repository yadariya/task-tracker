// Based on https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
// Performs on slices instead of complete store

export function useStorage<T>(key: string): [() => T | null, (slice: T) => void] {
  const loadSlice = () => {
    const savedData = localStorage.getItem(key);
    if (!savedData) {
      return null;
    }

    try {
      const state = JSON.parse(savedData) as T;
      currentState = state;
      return state;
    } catch (e) {
      return null;
    }
  };

  const saveSlice = (slice: T) => {
    if (slice === currentState) {
      return;
    }

    currentState = slice;
    localStorage.setItem(key, JSON.stringify(slice));
  };

  let currentState: T | null = null;
  return [loadSlice, saveSlice];
}
