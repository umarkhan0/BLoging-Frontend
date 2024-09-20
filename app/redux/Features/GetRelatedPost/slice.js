import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../../constant/const";
import { options } from "../../../constant/const";

export const relatedProducts = createAsyncThunk(
  "relatedPosts",
  async (category) => {
    try {
      // Sending category as a query parameter in the URL
      const response = await apiService.get(`/products?category=${category}`, options);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

const getAllRelatedPost = createSlice({
  name: "getBlogs",
  initialState: {
    isLoading: false,
    res: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(relatedProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(relatedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.res = action.payload;
      })
      .addCase(relatedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default getAllRelatedPost.reducer;
