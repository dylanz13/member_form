import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/reducer';

export interface Member {
    name: string;
    description: string;
    age?: number;
    imageUrl?: string;
    hobby?: string;
}

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;