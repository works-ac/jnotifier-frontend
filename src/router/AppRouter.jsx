import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AppLayout from "../layouts/AppLayout";
import ResultsPage from "../pages/ResultsPage";
import NotFoundPage from "../pages/NotFoundPage";
import JobDetailsPage from "../pages/JobDetailsPage";
import AccountsPage from "../pages/AccountsPage";
import AccountRegisterationPage from "../pages/AccountRegisterationPage";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/jobs/:applicationId",
        element: <JobDetailsPage />,
      },
      {
        path: "results",
        element: <ResultsPage />,
      },
      {
        path: "account",
        element: <AccountsPage />,
      },
      {
        path: "register",
        element: <AccountRegisterationPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default AppRoutes;
