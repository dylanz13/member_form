import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import UserService from './service';

export const getUsersAsync = createAsyncThunk(
    actionTypes.GET_USERS,
    async () => {
        return await UserService.getUsers();
    }
);

export const addUserAsync = createAsyncThunk(
    actionTypes.ADD_USER,
    async (data) => {
        return await UserService.addUser({ data });
    }
);

export const editUserAsync = createAsyncThunk(
    actionTypes.EDIT_USER,
    async (id, data) => {
        return await UserService.editUser( id, data );
    }
);

export const deleteUserAsync = createAsyncThunk(
    actionTypes.DELETE_USER,
    async (name) => {
        return await UserService.deleteUser({ name });
    }
);

export const deleteAllAsync = createAsyncThunk(
    actionTypes.DELETE_ALL,
    async () => {
        return await UserService.deleteAll();
    }
);