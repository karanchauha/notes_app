import React from "react";

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center  text-center">
      <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default Notfound;
