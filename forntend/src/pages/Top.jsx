import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Top = () => {
  // Initialize the useNavigate hook
  const navigate = useNavigate();

  // Function to handle the navigation to /note
  const goToCreateNote = () => {
    navigate("/note");
  };

  function Logout() {
    localStorage.clear();
    // return <Navigate to="/login" />;
    navigate("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-white">
          Welcome to the Notes App
        </h1>
        <p className="mt-2 text-lg text-white">
          Your personal space to organize and manage notes
        </p>
      </div>
      <div className="flex space-x-4 mb-8">
        {/* Button for creating a new note */}
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          onClick={goToCreateNote}
        >
          Create Note
        </button>
        {/* Button for logging out */}
        <button
          className="px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
          onClick={Logout}
        >
          Logout
        </button>
      </div>
      <div className="text-center">
        <p className="text-lg text-white mb-2">
          Here you can keep all your important notes organized and safe.
        </p>
        <p className="text-lg text-white">
          Start by creating your first note or log out to sign in as another
          user.
        </p>
      </div>
    </div>
  );
};

export default Top;
