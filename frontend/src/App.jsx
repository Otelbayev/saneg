import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/useAuthContext";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route
            path="/"
            element={
              <PrivateRoute to="/">
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute to="/profile">
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
