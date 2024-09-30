import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import { useAuthContext } from "./hooks/useAuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./utils/PrivateRoute";
import { routes } from "./utils/routes";

function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          {routes.map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={<PrivateRoute to={path}>{element}</PrivateRoute>}
            />
          ))}
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
