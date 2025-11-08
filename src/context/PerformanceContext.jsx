import { createContext, useState, useContext } from 'react';

const PerformanceContext = createContext();

export const usePerformance = () => useContext(PerformanceContext);

export const PerformanceProvider = ({ children }) => {
  const [stats, setStats] = useState({
    loadTime: 0,
    requestCount: 0,
  });

  const updateStats = (newStats) => {
    setStats((prevStats) => ({ ...prevStats, ...newStats }));
  };

  return (
    <PerformanceContext.Provider value={{ stats, updateStats }}>
      {children}
    </PerformanceContext.Provider>
  );
};
