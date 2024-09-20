import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../../constant/const";
import { options } from "../../../constant/const";

// Thunk for fetching related products
export const relatedProducts = createAsyncThunk(
  "relatedPosts",
  async (category, { rejectWithValue }) => {
    try {
      const response = await apiService.get(`/products?category=${category}`, options);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice for managing related products state
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
        state.error = action.payload; // Use action.payload for rejected error
      });
  },
});

// Export the reducer
export default getAllRelatedPost.reducer;
