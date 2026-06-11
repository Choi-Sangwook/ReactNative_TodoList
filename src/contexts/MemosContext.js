import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Single owner of memo state + persistence, mirroring TaskContext.
// Replaces the AsyncStorage calls that were scattered across the memo screens.
const MemosContext = createContext();

export const useMemosContext = () => useContext(MemosContext);

export const MemosProvider = ({ children }) => {
  const [memos, setMemos] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('memos')
      .then((stored) => setMemos(JSON.parse(stored || '{}')))
      .catch((error) => console.error('Error loading memos:', error));
  }, []);

  const _persist = (next) => {
    setMemos(next);
    AsyncStorage.setItem('memos', JSON.stringify(next)).catch((error) =>
      console.error('Error saving memos:', error)
    );
  };

  const saveMemo = ({ id, contents }) => {
    const memoId = id ?? Date.now().toString();
    const title = contents.substring(0, 7);
    _persist({ ...memos, [memoId]: { id: memoId, title, contents } });
  };

  const deleteMemo = (id) => {
    const next = { ...memos };
    delete next[id];
    _persist(next);
  };

  return (
    <MemosContext.Provider value={{ memos, saveMemo, deleteMemo }}>
      {children}
    </MemosContext.Provider>
  );
};
