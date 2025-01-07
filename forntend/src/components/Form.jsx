import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full max-w-md p-8 mx-auto mt-10 space-y-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
      <input
        className="w-full px-4 py-2 text-black border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        className="w-full px-4 py-2 text-black border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {loading && <LoadingIndicator />}
      <button
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        type="submit"
        disabled={loading}
      >
        {name}
      </button>
      <p className="text-gray-600">
        {method === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <a
          href={method === "login" ? "/register" : "/login"}
          className="text-blue-500 hover:underline"
        >
          {method === "login" ? "Register" : "Login"}
        </a>
      </p>
    </form>
  );
}

export default Form;
