// In Features/GetRelatedPost/slice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiService } from "@/app/constant/const";

// Assuming your thunk is for fetching related products by category
export const relatedProducts = createAsyncThunk(
  "relatedProducts/fetchByCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await apiService.get(`/products?category=${category}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const relatedProductsSlice = createSlice({
  name: "relatedProducts",
  initialState: {
    res: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(relatedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(relatedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.res = action.payload;
      })
      .addCase(relatedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default relatedProductsSlice.reducer;
