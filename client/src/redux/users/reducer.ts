import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../utils';
import { getUsersAsync, getDefaultAsync, addUserAsync, editUserAsync, deleteUserAsync, deleteAllAsync } from './thunks';

const INITIAL_STATE: AppState = {
    members: [],
    loading: false,
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
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.loading = false
                state.members = action.payload;
                console.log(state.members);
            })
            .addCase(getUsersAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch members';
            })
            // get default fetch
            .addCase(getDefaultAsync.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getDefaultAsync.fulfilled, (state, action) => {
                state.loading = false;
            })
            // Add Member
            .addCase(addUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.members.push(action.payload);
            })
            .addCase(addUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to add member';
            })
            // Update Member
            .addCase(editUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.members.findIndex((member: any) => member._id === action.payload["member"]["_id"]);
                state.members[index] = action.payload["member"];
            })
            .addCase(editUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to update member';
            })
            // Delete Member
            .addCase(deleteUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.members.findIndex((member: any) => member._id === action.payload.id);
                state.members.splice(index, 1);
            })
            .addCase(deleteUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to delete member';
            })
            // Delete all
            .addCase(deleteAllAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAllAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.members = [];
            });
    },
});

export default membersSlice.reducer;