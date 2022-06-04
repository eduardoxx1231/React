import React, { FC } from 'react';
import useRoutes from './hoocks/useRoutes';
import {BrowserRouter as Router} from 'react-router-dom'
import Provider from './components/Provider';
import './App.scss';

const  App: FC = () =>  {
  const routes = useRoutes();
  return (
    <Provider>
      <Router>
        {routes}
      </Router>
    </Provider>
  );
}

export default App;
