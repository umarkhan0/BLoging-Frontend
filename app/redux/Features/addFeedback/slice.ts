import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { apiService } from '../../../constant/const';  // Assuming this is your API utility
import { options } from '../../../constant/const';

// Define the shape of feedback data
interface FeedbackData {
    email: string;
    message: string;
    rating: number;
}

// Define the shape of the slice state
interface FeedbackState {
    isLoading: boolean;
    data: FeedbackData[] | null;
    error: string | null;
}

// Initial state
const initialState: FeedbackState = {
    isLoading: false,
    data: null,
    error: null,
};

// Thunk to fetch feedback data from API
export const fetchFeedback = createAsyncThunk(
    "feedback/fetchFeedback",
    async () => {
        try {
            const response = await apiService.get('/feedback', options);  // Adjust API path as needed
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Thunk to submit feedback data to API
export const submitFeedback = createAsyncThunk(
    "feedback/submitFeedback",
    async (feedbackData: FeedbackData) => {
        try {
            const response = await apiService.post('/addfeed', feedbackData, options);  // Adjust API path as needed
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Action to reset feedback state
export const resetFeedbackState = createAction("feedback/resetState");

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Feedback
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
                state.error = action.error.message || "Failed to fetch feedback";
            })
            
            // Submit Feedback
            .addCase(submitFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(submitFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = [...(state.data || []), action.payload];  // Add the submitted feedback to the state
            })
            .addCase(submitFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to submit feedback";
            })
            
            // Reset Feedback State
            .addCase(resetFeedbackState, (state) => {
                state.isLoading = false;
                state.data = null;
                state.error = null;
            });
    },
});

export default feedbackSlice.reducer;
