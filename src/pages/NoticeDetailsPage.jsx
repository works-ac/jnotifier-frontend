import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useNotices from "../hooks/features/useNotices";
import AppAlert from "../components/AppAlert";
import CircluarProgressLoader from "../components/CircluarProgressLoader";
import NoticeDetailsCard from "../views/NoticeDetailsCard";

function NoticeDetailsPage() {
  const { noticeId } = useParams();
  const {
    alert,
    handleAlertOnClose,
    fetchNoticeById,
    isNoticeLoading,
    noticeDetails,
  } = useNotices();

  useEffect(() => {
    document.title = `Job Notifier || ${noticeDetails?.title}`;
  }, [noticeDetails]);

  useEffect(() => {
    fetchNoticeById(noticeId);
  }, []);

  return (
    <>
      <AppAlert
        alert={alert}
        handleAlertOnClose={handleAlertOnClose}
        type={alert?.type}
      />

      {isNoticeLoading && (
        <CircluarProgressLoader
          text={`We're loading up the details of notice bearing id ${noticeId}, please wait....`}
          takeHeight
        />
      )}

      {!isNoticeLoading && <NoticeDetailsCard {...noticeDetails} />}
    </>
  );
}

export default NoticeDetailsPage;
