
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider } from './store.jsx';

const Main = () => {
    return (
        <React.StrictMode>          
            <StoreProvider>
                <RouterProvider router={router}>
                </RouterProvider>
            </StoreProvider>
        </React.StrictMode>
    );
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
