import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingIndicator;
