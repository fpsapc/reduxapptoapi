import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {

try {
    const response = await fetch('https://randomuser.me/api/?results=15');
    const data = await response.json();
    return data;
} catch (error) {
    throw new Error('Failed to fetch users');
}
});

const usersSlice = createSlice({
    name: 'users',
    initialState:{
        users:[],
        isLoading: true,
        error: undefined,
    },
    reducers:{

    },
    extraReducers: (builder) => {
builder.addCase(fetchUsers.pending, (state) => {
    state.isLoading = true;
    state.error = undefined;
})
.addCase(fetchUsers.fulfilled, (state, action) => {
    state.isLoading = false;
    state.users = action.payload;
})
.addCase(fetchUsers.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error.message;
})
    },
})

export const selectUsers = state => state.users.users;
export const selectIsLoading = state => state.users.isLoading;
export const selectError = state => state.users.error;
export const { actions } = usersSlice;
export default usersSlice.reducer;