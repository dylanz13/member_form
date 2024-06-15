import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { Provider } from 'react-redux';
import { viteEnv } from './vite-env';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={viteEnv}>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </Provider>
    </React.StrictMode>
);