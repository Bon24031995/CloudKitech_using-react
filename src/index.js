import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";import Dashboard from './Component/Dashboard';

const route = createBrowserRouter([{
  path:"/",
  element:<App />
},{
  path:"/Dashboard",
  element:<Dashboard />
}])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);

reportWebVitals();
