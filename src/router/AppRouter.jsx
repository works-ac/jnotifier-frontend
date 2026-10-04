import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AppLayout from "../layouts/AppLayout";
import NotFoundPage from "../pages/NotFoundPage";
import JobDetailsPage from "../pages/JobDetailsPage";
import AccountsPage from "../pages/AccountsPage";
import AccountRegisterationPage from "../pages/AccountRegisterationPage";
import RecoverAccountPage from "../pages/RecoverAccountPage";
import NoticePage from "../pages/NoticePage";
import NoticeDetailsPage from "../pages/NoticeDetailsPage";
import PostView from "../components/wrapper/PostView";
import ArchivesPage from "../pages/ArchivesPage";
import OfflinePage from "../pages/OfflinePage";

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
        path: "archives",
        element: (
          <PostView>
            <ArchivesPage />
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
  {
    path: "/offline",
    element: <OfflinePage />,
  },
]);

export default AppRoutes;
