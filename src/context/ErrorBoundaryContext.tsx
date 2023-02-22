import { createContext } from 'react';

export interface ErrorContextType {
  triggerError: (error: TypeError) => void;
}

export const ErrorBoundaryContext = createContext<ErrorContextType>(null!);
