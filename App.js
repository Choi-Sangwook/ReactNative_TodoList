import 'react-native-gesture-handler';
import React from 'react';
import Toast from 'react-native-toast-message';
import { TasksProvider } from './src/TaskContext';
import { MemosProvider } from './src/MemosContext';
import AppMain from './src/App';

const App = () => {
  return (
    <TasksProvider>
      <MemosProvider>
        <AppMain />
        <Toast />
      </MemosProvider>
    </TasksProvider>
  );
};

export default App;
