import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    setLoading(true);
    api
      .get("/api/notes/")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => alert(err.message || "Failed to fetch notes."))
      .finally(() => setLoading(false));
  };

  const deleteNote = (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setLoading(true);
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error.message || "Error deleting note."))
      .finally(() => setLoading(false));
  };

  const createNote = (e) => {
    e.preventDefault();
    setSubmitting(true);
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created!");
          setTitle("");
          setContent("");
        } else {
          alert("Failed to create note.");
        }
        getNotes();
      })
      .catch((err) => alert(err.message || "Error creating note."))
      .finally(() => setSubmitting(false));
  };

  const handleGoHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="h-screen w-full flex gap-5">
      {/* Left div for creating note */}
      <div className="w-1/2 h-full bg-white rounded-lg shadow-lg p-6 ">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Welcome to Notes
        </h1>

        {/* Create Note Form */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Create a Note
          </h2>
          <form onSubmit={createNote} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="mt-2 block w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                className="mt-2 block w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-black"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full px-4 py-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                submitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
        <button
          className="w-1/2 px-4 py-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white bg-blue-500"
          onClick={handleGoHome}
        >
          Back to Home
        </button>
      </div>

      {/* Right div for displaying notes */}
      <div className="w-1/2 h-full p-6 overflow-auto">
        {loading ? (
          <div className="text-gray-600 text-center">Loading notes...</div>
        ) : notes.length ? (
          notes.map((note) => (
            <Note note={note} onDelete={deleteNote} key={note.id} />
          ))
        ) : (
          <div className="text-gray-600 text-center">No notes found.</div>
        )}
      </div>
    </div>
  );
}

export default Home;
