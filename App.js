import 'react-native-gesture-handler';
import React from 'react';
import Toast from 'react-native-toast-message';
import { TasksProvider } from './src/contexts/TasksContext';
import { MemosProvider } from './src/contexts/MemosContext';
import AppMain from './src/navigation/AppNavigator';

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
