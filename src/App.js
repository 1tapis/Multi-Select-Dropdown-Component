import React, { createContext } from 'react';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import './App.css';

export const ApiContext = createContext();

const ApiProvider = ({ apiEndpoint, children }) => {
  return (
    <ApiContext.Provider value={{ apiEndpoint }}>
      {children}
    </ApiContext.Provider>
  );
};

const App = () => {
  const apiEndpoint = 'https://jsonplaceholder.typicode.com/users';

  return (
    <ApiProvider apiEndpoint={apiEndpoint}>
      <div className="App">
        <h1>Multi-Select Dropdown Component</h1>
        <MultiSelectDropdown />
      </div>
    </ApiProvider>
  );
};

export default App;
