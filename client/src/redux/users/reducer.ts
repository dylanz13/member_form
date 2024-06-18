import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE, AppState } from '../utils';
import { getUsersAsync, getIdAsync, addUserAsync, editUserAsync, deleteUserAsync, deleteAllAsync } from './thunks';

const INITIAL_STATE: AppState = {
    list: [],
    getMembers: REQUEST_STATE.IDLE,
    addMember: REQUEST_STATE.IDLE,
    updateMember: REQUEST_STATE.IDLE,
    deleteMember: REQUEST_STATE.IDLE,
    error: null,
};

const membersSlice = createSlice({
    name: 'members',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Members
            .addCase(getUsersAsync.pending, (state) => {
                state.getMembers = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.getMembers = REQUEST_STATE.FULFILLED;
                state.list = action.payload;
            })
            .addCase(getUsersAsync.rejected, (state, action) => {
                state.getMembers = REQUEST_STATE.REJECTED;
                state.error = action.error.message ?? 'Failed to fetch members';
            })
            // Get ID from Name
            .addCase(getIdAsync.pending, (state) => {
                state.getId = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.getId = REQUEST_STATE.FULFILLED;
                state.list = action.payload;
            })
            // Add Member
            .addCase(addUserAsync.pending, (state) => {
                state.addMember = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(addUserAsync.fulfilled, (state, action) => {
                state.addMember = REQUEST_STATE.FULFILLED;
                state.list = action.payload;
            })
            .addCase(addUserAsync.rejected, (state, action) => {
                state.addMember = REQUEST_STATE.REJECTED;
                state.error = action.error.message ?? 'Failed to add member';
            })
            // Update Member
            .addCase(editUserAsync.pending, (state) => {
                state.updateMember = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(editUserAsync.rejected, (state, action) => {
                state.updateMember = REQUEST_STATE.REJECTED;
                state.error = action.error.message ?? 'Failed to update member';
            })
            // Delete Member
            .addCase(deleteUserAsync.pending, (state) => {
                state.deleteMember = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteUserAsync.rejected, (state, action) => {
                state.deleteMember = REQUEST_STATE.REJECTED;
                state.error = action.error.message ?? 'Failed to delete member';
            })
            // Delete all
            .addCase(deleteAllAsync.pending, (state) => {
                state.getMembers = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteAllAsync.fulfilled, (state, action) => {
                state.getMembers = REQUEST_STATE.FULFILLED;
                state.list = action.payload;
            });
    },
});

export default membersSlice.reducer;