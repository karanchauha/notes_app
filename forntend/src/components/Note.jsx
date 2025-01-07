import React from "react";

function Note({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="w-full  bg-gray-100 shadow-lg rounded-lg p-6 mx-auto mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-3">{note.title}</h2>
      <p className="text-gray-700 mb-4">{note.content}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{formattedDate}</span>
        <button
          className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Note;
