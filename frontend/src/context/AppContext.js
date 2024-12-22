// src/context/AppContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeView, setActiveView] = useState(null);
  const [selectedSem, setSelectedSem] = useState('');
  const [lastDir, setLastDir] = useState("");

  return (
    <AppContext.Provider value={{ activeView, setActiveView, selectedSem, setSelectedSem,lastDir, setLastDir }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
