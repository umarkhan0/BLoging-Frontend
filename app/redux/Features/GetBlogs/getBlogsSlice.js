import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../../constant/const";
import { options } from "../../../constant/const";
export const getBlogs = createAsyncThunk("getBlogs", async () => {
    try {
        const response = await apiService.get('/getallProducts', options);
        return response.data; 
    } catch (error) {
      throw error.response.data;
    }
});

const getAllProducts = createSlice({
    name: "getBlogs",
    initialState: {
        isLoading: false,
        res: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
                state.error = false; 
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.res = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default getAllProducts.reducer;
