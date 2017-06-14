import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import App from './layouts/App';

const renderRoutes = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

export default renderRoutes;
