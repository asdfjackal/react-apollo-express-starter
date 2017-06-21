import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import AppContainer from './containers/AppContainer';

const renderRoutes = () => {

  return (
    <BrowserRouter>
      <AppContainer/>
    </BrowserRouter>
  );
}

export default renderRoutes;
