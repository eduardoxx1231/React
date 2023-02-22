import React from 'react';
import { ErrorBoundaryContext } from '../context/ErrorBoundaryContext';

export const useErrorHandling = () => {
  return React.useContext(ErrorBoundaryContext);
};
