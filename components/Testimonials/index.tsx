"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbacks } from "../../app/redux/Features/getfeedback/slice";
import Loader from "../Loader";
import { useTheme } from "next-themes";

interface Feedback {
  _id: string;
  email: string;
  message: string;
  rating: number;
}

interface FeedbackState {
  feedbacks: {
    feedbacks: Feedback[];
  };
  loading: boolean;
  error: string | null;
}

const Testimonials = () => {
  const dispatch = useDispatch();
  const [displayedFeedbacks, setDisplayedFeedbacks] = useState<Feedback[]>([]);
  const { feedbacks, loading, error } = useSelector(
    (state: { feedbackData: FeedbackState }) => state.feedbackData
  );
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  useEffect(() => {
    if (feedbacks?.feedbacks) {
      const shuffledFeedbacks = [...feedbacks.feedbacks].sort(() => 0.5 - Math.random());
      setDisplayedFeedbacks(shuffledFeedbacks.slice(0, 6));
    }
  }, [feedbacks]);

  const renderStars = (rating: number) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${i <= filledStars ? "text-[#4a6cf7]" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.995h5.247c.969 0 1.371 1.24.588 1.81l-4.243 3.092 1.618 4.995c.3.921-.755 1.688-1.54 1.118L10 14.347l-4.239 3.09c-.784.57-1.838-.197-1.539-1.118l1.617-4.995L1.595 9.732c-.784-.57-.38-1.81.588-1.81h5.247L9.048 2.927z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <section className="relative pt-20 lg:pt-[120px] pb-12 lg:pb-[90px]">
      <div className="containerm m-7 p-4">
        <div className="flex flex-wrap mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] max-w-[510px]">
              <span className="font-semibold text-lg text-primary mb-2 block">
                Testimonials
              </span>
              <h2 className="font-bold text-3xl text-body-color sm:text-4xl md:text-[40px]  mb-4">
                What Our Users Say
              </h2>
              <p className="text-base text-body-color">
                Here’s what people are saying about our services.
              </p>
            </div>
          </div>
        </div>
        {loading && <Loader />}
        {error && <div>Error loading testimonials: {error}</div>}
        <div className="flex flex-wrap -mx-4 ">
          {displayedFeedbacks.length > 0 ? (
            displayedFeedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className={`w-full p-4 md:w-1/2 xl:w-1/3 ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <div
                  className={`p-8 rounded-lg shadow-lg mb-8 h-full flex flex-col ${
                    theme === "dark" ? "bg-gray-900" : "bg-gray-100"
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3">
                      {feedback.email}
                    </h3>
                    <p className="text-base mb-6">
                      {feedback.message}
                    </p>
                  </div>
                  <div className="flex items-center mt-auto">
                    <div className="mr-4">
                      <img
                        src="http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdln3gflvk%2Fimage%2Fupload%2Fv1726394889%2Fknfvw2os5mjpzvp1fr4o.png&w=1920&q=75"
                        alt="User avatar"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">
                        {feedback.email}
                      </h4>
                      <div className="flex">{renderStars(feedback.rating)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No testimonials available</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
