"use client";
import { useEffect, useState } from "react";
import SingleBlog from "@/components/Blog/SingleBlog";
import { getBlogs } from "@/app/redux/Features/GetBlogs/getBlogsSlice";
import { getAdminProfileThunk } from "../redux/Features/GetPeofile/getprofile";
import Loader from "@/components/Loader"; // Import your Loader component
import { useAppSelector, useAppDispatch } from "../redux/Store/store";

const categories = [
  "All",
  "Technology",
  "Design",
  "Development",
  "Career & Education",
  "Business & Startups",
  "Lifestyle",
  "Entertainment",
  "Finance",
  "Science",
];
const Blog = () => {
  const dispatch = useAppDispatch();
  interface RootState {
    getBlogs: {
      res: any;
      isLoading: boolean;
      error: string | null;
    },
    getAutherData: {
      error: string | null;
      isLoading: boolean;
      res: any; 
    }
  }
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const blogsPerPage = 6;

  const { res: blogs = [], isLoading, error } = useAppSelector((state: RootState) => state.getBlogs);
  const {
    res: profileData,
    isLoading: loadingProfile,
    error: errorProfile,
  } = useAppSelector((state: RootState) => state.getAutherData);


  useEffect(() => {
    dispatch(getBlogs() as any);
    dispatch(getAdminProfileThunk() as any);
  }, []);

  const filteredBlogs =
    blogs?.products?.filter((blog) => {
      const title = blog.title?.toLowerCase() || "";
      const content = blog.content?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();
      const matchesSearch = title.includes(query) || content.includes(query);
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }) || [];

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = currentPage * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const reversedBlogs =
    currentPage === totalPages ? [...currentBlogs].reverse() : currentBlogs;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPaginationButtons = () => {
    const paginationButtons = [];
    const visiblePages = 3;

    for (let i = 1; i <= Math.min(visiblePages, totalPages); i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`mx-1 flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm ${currentPage === i
              ? "bg-primary text-white"
              : "bg-body-color bg-opacity-[15%] text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
            }`}
        >
          {i}
        </button>
      );
    }

    if (totalPages > visiblePages) {
      paginationButtons.push(<span key="dots" className="mx-2">...</span>);

      paginationButtons.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`mx-1 flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm ${currentPage === totalPages
              ? "bg-primary text-white"
              : "bg-body-color bg-opacity-[15%] text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
            }`}
        >
          {totalPages}
        </button>
      );
    }

    return paginationButtons;
  };

  if (isLoading || loadingProfile) {
    return (
      <section
        id="blog"
        className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
      >
        <div className="container">
          <Loader />
        </div>
      </section>
    );
  }

  if (error || errorProfile) {
    return <div>Error: {error || errorProfile}</div>;
  }

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark  py-16 md:py-20 lg:py-28"
    >
      <div className="container sm:mt-7 mt-9 ">
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search here..."
            className="border-stroke dark:text-body-color-dark dark:shadow-two mr-4 w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border-stroke cursor-pointer dark:text-body-color-dark dark:shadow-two mr-4 w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {reversedBlogs.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {reversedBlogs.map((blog) => (
              <div key={blog.id} className="w-full">
                <SingleBlog blog={blog} author={profileData} />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col mt-6 items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          {totalPages > 1 && (
            <div className="flex items-center">
              <button
                onClick={handlePrevPage}
                className="px-4 py-2 bg-gray-300 rounded-lg text-black"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {renderPaginationButtons()}
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-gray-300 rounded-lg text-black"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
          <div className="mt-4 text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
