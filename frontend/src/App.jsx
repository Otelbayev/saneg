import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/useAuthContext";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={user ? <Home /> : <Navigate to="login" />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
