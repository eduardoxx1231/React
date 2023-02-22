import React, { FC } from 'react';
import useRoutes from './hoocks/useRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import Provider from './components/Provider';
import ErrorBoundary from './components/ErrorBoundary';
import './App.scss';

const App: FC = () => {
  const routes = useRoutes();
  return (
    <ErrorBoundary>
      <Provider>
        <Router>{routes}</Router>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
