import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AppLayout from "../layouts/AppLayout";
import ResultsPage from "../pages/ResultsPage";
import NotFoundPage from "../pages/NotFoundPage";
import JobDetailsPage from "../pages/JobDetailsPage";
import AccountsPage from "../pages/AccountsPage";
import AccountRegisterationPage from "../pages/AccountRegisterationPage";
import RecoverAccountPage from "../pages/RecoverAccountPage";
import NoticePage from "../pages/NoticePage";
import NoticeDetailsPage from "../pages/NoticeDetailsPage";

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
        path: "notices",
        element: <NoticePage />,
      },
      {
        path: "/notice/:noticeId",
        element: <NoticeDetailsPage />,
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
        path: "recover/account",
        element: <RecoverAccountPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default AppRoutes;
