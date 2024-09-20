import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog, author }: { blog: Blog; author: any }) => {
  const { title, image, imgIntro, tags, _id } = blog;

  // Extract the part of the email before the '@' symbol
  const authorEmailName = author?.email ? author.email.split('@')[0] : "Unknown";

  const formattedDate = new Date(author.createdAt).toLocaleDateString();

  return (
    <div className="flex flex-col rounded-lg overflow-hidden bg-white shadow-md dark:bg-dark h-full">
      {/* Image Section */}
      <Link
        href={`/blog-sidebar/?id=${_id}`}
        className="relative block aspect-[37/22] w-full"
      >
        <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
          {tags[0]}
        </span>
        <Image src={image} alt="image" layout="fill" objectFit="cover" />
      </Link>

      <div className="flex flex-col flex-grow p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        <h3 className="mb-4 text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl">
          <Link href={`/blog-sidebar/?id=${_id}`}>
            {title}
          </Link>
        </h3>
        <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          {imgIntro}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:pr-3">
            <div className="mr-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                {author?.image && <Image src={author.image} alt="author" layout="fill" objectFit="cover" />}
              </div>
            </div>
            <div>
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                By {authorEmailName}
              </h4>
            </div>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              Date
            </h4>
            <p className="text-xs text-body-color">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
