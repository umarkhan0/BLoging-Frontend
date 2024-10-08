"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchFeedbacks } from "../../app/redux/Features/getfeedback/slice";
import Loader from "../Loader";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useAppDispatch } from "../../app/redux/Store/store";
import profileIcon from '../../app/images/profileicons.jpg';
import ErrorPage from "@/app/error/page";
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
  const dispatch = useAppDispatch();

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
              <h2 className="font-bold text-3xl text-body-color sm:text-4xl md:text-[40px] mb-4">
                What Our Users Say
              </h2>
              <p className="text-base text-body-color">
                Here’s what people are saying about our services.
              </p>
            </div>
          </div>
        </div>
        {loading && <Loader />}
       
        <div className="flex flex-wrap -mx-4">
          {displayedFeedbacks && displayedFeedbacks?.length > 0 ? (
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
                      <Image
                        src={profileIcon}
                        alt="User avatar"
                        width={40} // Set appropriate width
                        height={40} // Set appropriate height
                        className="rounded-full"
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
            <div className="mx-auto text-center mb-9">
            <svg
              className="w-full mx-auto text-center"
              height="210"
              viewBox="0 0 474 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M25 163.051H101.211V191H133.308V163.051H153V136.111H133.308V32H91.2871L25 136.577V163.051ZM101.831 136.111H58.8025V134.869L100.591 68.6445H101.831V136.111Z"
                stroke="url(#paint0_linear_116:1137)"
                strokeWidth="3"
              />
              <path
                opacity="0.5"
                d="M307 133.051H383.211V161H415.308V133.051H435V106.111H415.308V2H373.287L307 106.577V133.051ZM383.831 106.111H340.803V104.869L382.591 38.6445H383.831V106.111Z"
                stroke="url(#paint1_linear_116:1137)"
                strokeWidth="3"
              />
              <circle
                opacity="0.8"
                cx="227.5"
                cy="81.5"
                r="68.5"
                fill="#4A6CF7"
              />
              <mask
                id="mask0_116:1137"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="159"
                y="13"
                width="137"
                height="137"
              >
                <circle
                  opacity="0.8"
                  cx="227.5"
                  cy="81.5"
                  r="68.5"
                  fill="#4A6CF7"
                />
              </mask>
              <g mask="url(#mask0_116:1137)">
                <circle
                  opacity="0.8"
                  cx="227.5"
                  cy="81.5"
                  r="68.5"
                  fill="url(#paint2_radial_116:1137)"
                />
                <g opacity="0.8" filter="url(#filter0_f_116:1137)">
                  <circle
                    cx="233.543"
                    cy="49.2645"
                    r="28.2059"
                    fill="white"
                  />
                </g>
              </g>
              <path
                d="M0 182H83.5V209H150.5V178H169.5V148.5C169.5 148.5 194 165 229.5 165C265 165 294 134.5 294 134.5V152H306.5H361V178H435V152H474"
                stroke="white"
                strokeOpacity="0.08"
                strokeWidth="2"
              />
              <defs>
                <filter
                  id="filter0_f_116:1137"
                  x="175.337"
                  y="-8.94141"
                  width="116.412"
                  height="116.412"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="15"
                    result="effect1_foregroundBlur_116:1137"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_116:1137"
                  x1="25"
                  y1="183"
                  x2="126.155"
                  y2="27.0837"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4A6CF7" stopOpacity="0" />
                  <stop offset="1" stopColor="#4A6CF7" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_116:1137"
                  x1="307"
                  y1="153"
                  x2="408.155"
                  y2="-2.91631"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4A6CF7" stopOpacity="0" />
                  <stop offset="1" stopColor="#4A6CF7" />
                </linearGradient>
                <radialGradient
                  id="paint2_radial_116:1137"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(227.5 81.5) rotate(90) scale(73.5368)"
                >
                  <stop stopOpacity="0.47" />
                  <stop offset="1" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
