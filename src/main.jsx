import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // 👈 Aquí

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider } from './store.jsx';

const Main = () => (
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);

