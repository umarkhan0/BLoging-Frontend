import { createSlice, createAsyncThunk , createAction } from "@reduxjs/toolkit";
import { apiService } from "../../../constant/const";
import { options } from "../../../constant/const";
export const getProductThunk = createAsyncThunk("getProduct", async () => {
    try {
        const queryParams = new URLSearchParams(window.location.search);
        const productId = queryParams.get('id');
        console.log(productId);
        const response = await apiService.get(`/get/${productId}`, options);
        return response.data; 
    } catch (error) {
      throw error.response.data;
    }
});
export const resetGetProductProductState = createAction("getProduct/resetState");

const getProduct = createSlice({
    name: "getProduct",
    initialState: {
        isLoading: false,
        res: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductThunk.pending, (state) => {
                state.isLoading = true;
                state.error = false; 
            })
            .addCase(getProductThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.res = action.payload;
            })
            .addCase(getProductThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(resetGetProductProductState, (state) => {
                state.isLoading = false;
                state.res = null;
                state.error = null;
            });
    },
});

export default getProduct.reducer;
