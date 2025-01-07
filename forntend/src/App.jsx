import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/Notfound";
import Top from "./pages/Top";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1>; */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Top />
              </ProtectedRoute>
            }
          />
          <Route
            path="/note"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
