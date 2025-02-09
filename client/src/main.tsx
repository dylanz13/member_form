import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import Default from "./components/Default";


ReactDOM.createRoot(document.getElementById('root')!).render(
    //<React.StrictMode>
        <Provider store={store}>
            <ChakraProvider>
                <Default />
                <App />
            </ChakraProvider>
        </Provider>
    //</React.StrictMode>
);