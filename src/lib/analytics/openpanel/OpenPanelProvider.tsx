import { createContext, useContext, ReactNode } from 'react';
import { analyticsClient } from './client';
import type { OpenPanelClient } from './types';

const OpenPanelContext = createContext<OpenPanelClient | null>(null);

export const useOpenPanel = () => {
  const context = useContext(OpenPanelContext);
  if (!context) {
    throw new Error('useOpenPanel must be used within an OpenPanelProvider');
  }
  return context;
};

interface OpenPanelProviderProps {
  children: ReactNode;
}

export const OpenPanelProvider = ({ children }: OpenPanelProviderProps) => {
  return (
    <OpenPanelContext.Provider value={analyticsClient}>
      {children}
    </OpenPanelContext.Provider>
  );
}; 