"use client";
import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "@/app/redux/Features/GetBlogs/getBlogsSlice";
import { getAdminProfileThunk } from "@/app/redux/Features/GetPeofile/getprofile";
import Loader from "../Loader"; // Import your Loader component
import { useAppSelector, useAppDispatch } from "../../app/redux/Store/store";
const Blog = () => {
  interface RootState {
    getBlogs: {
      res: any;
      isLoading: boolean;
      error: string | null;
    }
    getAutherData: {
      error: string | null;
      isLoading: boolean;
      res: any; 
    }
  } 
   const dispatch = useAppDispatch();

  let [allBlogs, setBlogs] = useState([]);
  let [profileData, setProfileData] = useState({});

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getAdminProfileThunk());
  }, [dispatch]);

  const blogs =  useAppSelector((state: RootState) => state.getBlogs);
  const profile = useAppSelector((state: RootState) => state.getAutherData);

  let { isLoading, res, error } = blogs;
  let { error: errorProfile, isLoading: loadingProfile, res: resPonseProfile } = profile;

  useEffect(() => {
    if (res?.products) {
      setBlogs(res.products);
    }
    if (resPonseProfile) {
      setProfileData(resPonseProfile);
    }
  }, [res, resPonseProfile]);

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

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {profileData && allBlogs && allBlogs.map((blog) => (
            <div key={blog._id} className="">
              <SingleBlog blog={blog} author={profileData} />
            </div>
          ))}
        </div>

        <div className="flex flex-col mt-6 items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href="/blog"
            className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
          >
            Load more...
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
