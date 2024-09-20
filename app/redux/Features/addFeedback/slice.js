import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { apiService } from '../../../constant/const';  // Assuming this is your API utility
import { options } from '../../../constant/const';

// Thunk to fetch feedback data from API
export const fetchFeedback = createAsyncThunk("feedback/fetchFeedback", async () => {
    try {
        const response = await apiService.get('/feedback', options);  // Adjust API path as needed
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Thunk to submit feedback data to API
export const submitFeedback = createAsyncThunk("feedback/submitFeedback", async (feedbackData) => {
    try {
        const response = await apiService.post('addfeed', feedbackData, options);  // Adjust API path as needed
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Action to reset feedback state
export const resetFeedbackState = createAction("addfeed/resetState");

const feedbackSlice = createSlice({
    name: "feedback",
    initialState: {
        isLoading: false,
        data: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null; 
            })
            .addCase(fetchFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;  // Store the fetched feedback data
            })
            .addCase(fetchFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;  // Store the error message
            })
            .addCase(submitFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null; 
            })
            .addCase(submitFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;  // Update the state with the submitted feedback
            })
            .addCase(submitFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;  // Store the error message
            })
            .addCase(resetFeedbackState, (state) => {
                state.isLoading = false;
                state.data = null;
                state.error = null;
            });
    },
});

export default feedbackSlice.reducer;
