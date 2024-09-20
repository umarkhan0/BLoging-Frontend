import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import getBlogs from "../Features/GetBlogs/getBlogsSlice";
import adminProfileSlice from "../Features/GetPeofile/getprofile";
import getProductThunk from "../Features/getSingleBlog/getSingleBlog";
import relatedProducts from "../Features/GetRelatedPost/slice";
import feedbackReducer from "../Features/addFeedback/slice";
import fetchFeedback from "../Features/getfeedback/slice";

export const store = configureStore({
  reducer: {
    getBlogs,
    relatedProducts,
    getAutherData: adminProfileSlice,
    getBlogData: getProductThunk,
    feedback: feedbackReducer,
    feedbackData: fetchFeedback,
  },
});

// Type for the dispatch function
export type AppDispatch = typeof store.dispatch;

// Type for the RootState
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
