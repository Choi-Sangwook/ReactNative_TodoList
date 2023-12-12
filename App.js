import React from 'react';
import { TasksProvider } from './src/TaskContext';
import AppMain from './src/App'


const App = () => {
  return (
        <TasksProvider>
          <AppMain/>
        </TasksProvider>
  );
};

export default App;
