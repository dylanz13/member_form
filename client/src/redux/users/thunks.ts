import {createAsyncThunk} from '@reduxjs/toolkit';
import {actionTypes} from './actionTypes';
import UserService from './service';
import {Member} from "../store";

export const getUsersAsync = createAsyncThunk(
    actionTypes.GET_USERS,
    async () => {
        return await UserService.getUsers();
    }
);

export const addUserAsync = createAsyncThunk(
    actionTypes.ADD_USER,
    async (data: Partial<Member>) => {
        return await UserService.addUser( data );
    }
);



export const getDefaultAsync = createAsyncThunk(
    actionTypes.GET_DEFAULT,
    async () => {
        const noHouse = await UserService.getUser("Dr. Gregory House");
        if (!noHouse) {
            const data = await UserService.getDefault();
            return await UserService.addUser(data);
        }
    }
);

export const editUserAsync = createAsyncThunk(
    actionTypes.EDIT_USER,
    async ( obj: {id: string, data: Partial<Member>} ) => {
        return await UserService.editUser( obj["id"], obj["data"] );
    }
);

export const deleteUserAsync = createAsyncThunk(
    actionTypes.DELETE_USER,
    async (id: string) => {
        return await UserService.deleteUser( id );
    }
);

export const deleteAllAsync = createAsyncThunk(
    actionTypes.DELETE_ALL,
    async () => {
        return await UserService.deleteAll();
    }
);