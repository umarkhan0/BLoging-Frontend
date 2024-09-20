import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary border-dashed rounded-full animate-spin dark:border-white"></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-10 h-10 bg-primary rounded-full dark:bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
