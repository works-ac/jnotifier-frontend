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
import PostView from "../components/wrapper/PostView";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <PostView>
            <HomePage />
          </PostView>
        ),
      },
      {
        path: "/jobs/:applicationId",
        element: (
          <PostView>
            <JobDetailsPage />
          </PostView>
        ),
      },
      {
        path: "results",
        element: (
          <PostView>
            <ResultsPage />
          </PostView>
        ),
      },
      {
        path: "notices",
        element: (
          <PostView>
            <NoticePage />
          </PostView>
        ),
      },
      {
        path: "/notice/:noticeId",
        element: (
          <PostView>
            <NoticeDetailsPage />
          </PostView>
        ),
      },
      {
        path: "account",
        element: (
          <PostView>
            <AccountsPage />
          </PostView>
        ),
      },
      {
        path: "register",
        element: (
          <PostView>
            <AccountRegisterationPage />
          </PostView>
        ),
      },
      {
        path: "recover/account",
        element: (
          <PostView>
            <RecoverAccountPage />
          </PostView>
        ),
      },
      {
        path: "*",
        element: (
          <PostView>
            <NotFoundPage />
          </PostView>
        ),
      },
    ],
  },
]);

export default AppRoutes;
