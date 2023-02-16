import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ProtectedRoute from "./core/guards/ProtectedRoute";
import "./assets/scss/styles.scss";
import "antd/dist/reset.css";

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
