import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import apiService from "../"
import { apiService } from '../../../constant/const';  // Assuming this is your API utility

// Thunk to fetch feedbacks
export const fetchFeedbacks = createAsyncThunk('feedback/fetchFeedbacks', async () => {
  const response = await apiService.get('/getfeed');
  return response.data;
});

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
        state.loading = false;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default feedbackSlice.reducer;
