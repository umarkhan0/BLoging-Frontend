"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitFeedback, resetFeedbackState } from '../../app/redux/Features/addFeedback/slice';  // Adjust path as needed
import Loader from '../Loader';
import NewsLatterBox from './NewsLatterBox';

const StarRating = ({ rating, onChange }) => {
  const handleClick = (value) => {
    onChange(value);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          onClick={() => handleClick(star)}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.87L12 17.77l-6.18 3.35L7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

const Contact = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.feedback);
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState({ email: '', message: '' });

  const validate = () => {
    const newErrors = { email: '', message: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!message) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(submitFeedback({ email, message, rating }));
    }
  };

  React.useEffect(() => {
    return () => {
      dispatch(resetFeedbackState());
    };
  }, [dispatch]);

  return (
    <>
    {
      isLoading ? 
      <Loader />
    :
        <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 ">
            <div className="wow fadeInUp shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]" data-wow-delay=".15s">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
               Your Feedback
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Your Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none`}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label htmlFor="message" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Enter your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={`border-stroke dark:text-body-color-dark dark:shadow-two w-full resize-none rounded-sm border ${errors.message ? 'border-red-500' : 'border-gray-300'} bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none`}
                      ></textarea>
                      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                    </div>
                  </div>
                  <div className="w-full px-4 mb-8">
                    <label htmlFor="rating" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                      Rating
                    </label>
                    <StarRating rating={rating} onChange={setRating} />
                  </div>
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      className={`shadow-submit dark:shadow-submit-dark rounded-sm ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'} px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90`}
                      disabled={isLoading}
                    >
                      {'Submit'}
                    </button>
                  </div>
                </div>
              </form>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
          
        </div>
      </div>
    </section>

}
    </>
  );
};

export default Contact;
