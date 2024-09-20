import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { apiService } from '../../../constant/const';  // Assuming this is your API utility
import { options } from '../../../constant/const';
export const getAdminProfileThunk = createAsyncThunk("getAdminProfile", async () => {
    try {
        const response = await apiService.get('/admin/profile', options);  // Adjust API path as needed
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});
export const resetAdminProfileState = createAction("getAdminProfile/resetState");
const adminProfileSlice = createSlice({
    name: "getAdminProfile",
    initialState: {
        isLoading: false,
        res: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminProfileThunk.pending, (state) => {
                state.isLoading = true;
                state.error = false; 
            })
            .addCase(getAdminProfileThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.res = action.payload;  // Store the fetched admin data
            })
            .addCase(getAdminProfileThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;  // Store the error message
            })
            .addCase(resetAdminProfileState, (state) => {
                state.isLoading = false;
                state.res = null;
                state.error = null;
            });
    },
});

export default adminProfileSlice.reducer;
