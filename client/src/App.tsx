import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './redux/store';
import MemberForm from './components/MemberForm';
import MemberList from './components/MemberList';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="app">
                <MemberForm />
                <MemberList />
            </div>
        </Provider>
    );
};

export default App;
