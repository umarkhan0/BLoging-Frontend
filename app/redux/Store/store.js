import { configureStore } from "@reduxjs/toolkit";
import getBlogs from "../Features/GetBlogs/getBlogsSlice";
import  adminProfileSlice  from "../Features/GetPeofile/getprofile";
import getProductThunk from "../Features/getSingleBlog/getSingleBlog";
import relatedProducts from "../Features/GetRelatedPost/slice";
import feedbackReducer from "../Features/addFeedback/slice";
import  fetchFeedback  from "../Features/getfeedback/slice";
export const store = configureStore({
    reducer: {
     getBlogs,
     relatedProducts,
     getAutherData: adminProfileSlice,
     getBlogData: getProductThunk,
     feedback: feedbackReducer,
     
     feedbackData: fetchFeedback
    },
  });