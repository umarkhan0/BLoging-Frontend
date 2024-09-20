'use client'; 
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "@/app/redux/Features/GetBlogs/getBlogsSlice";
import Loader from "../Loader";
const AboutSectionTwo = () => {
  const dispatch = useDispatch();
  const { res: blogs } = useSelector((state: any) => state.getBlogs);
  const [randomBlog, setRandomBlog] = useState(null);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (blogs?.products?.length > 0) {
      const randomIndex = Math.floor(Math.random() * blogs.products.length);
      setRandomBlog(blogs.products[randomIndex]);
    }
    console.log(blogs?.products);
  }, [blogs]);

  const getTruncatedText = (text: string) => {
    const maxLength = 650;
    return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
  };

  if (!randomBlog) {
    return <Loader />;
  }

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src={randomBlog.image}
                alt="about image"
                fill
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              />
              <Image
                src={randomBlog.image}
                alt="about image"
                fill
                className="drop-shadow-three hidden dark:block dark:drop-shadow-none"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  {randomBlog.title}
                </h3>
                <p 
                  className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: getTruncatedText(randomBlog.paragraph) }}
                />
                <div className="flex flex-col mt-6 items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                   href={`/blog-sidebar/?id=${randomBlog._id}`}
                    className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    Read more...
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
