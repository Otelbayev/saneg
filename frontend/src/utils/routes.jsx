import Employee from "../pages/Employee";
import Home from "../pages/Home";
import JobTitle from "../pages/JobTitle";
import Profile from "../pages/Profile";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/employee",
    element: <Employee />,
  },
  {
    path: "/jobtitle",
    element: <JobTitle />,
  },
];
