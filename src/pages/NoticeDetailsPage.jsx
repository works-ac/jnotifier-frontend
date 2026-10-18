import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import useNotices from "../hooks/features/useNotices";
import AppAlert from "../components/AppAlert";
import CircluarProgressLoader from "../components/CircluarProgressLoader";
import NoticeDetailsCard from "../views/NoticeDetailsCard";
import useSEO from "../hooks/useSEO";
import WhatsAppPromotion from "../components/core/WhatsAppPromotion";

function NoticeDetailsPage() {
  const { noticeId } = useParams();
  const {
    alert,
    handleAlertOnClose,
    fetchNoticeById,
    isNoticeLoading,
    noticeDetails,
  } = useNotices();

  const articleSchema = useMemo(() => {
    if (!noticeDetails) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: noticeDetails.title,
      description: noticeDetails.noticeDescription || noticeDetails.title,
      publisher: {
        "@type": "Organization",
        name: "Job Notifier",
        logo: {
          "@type": "ImageObject",
          url: "https://www.thejobnotifier.in/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://www.thejobnotifier.in/notice/${noticeId}`,
      },
    };
  }, [noticeDetails, noticeId]);

  useSEO({
    title: noticeDetails?.title
      ? `Job Notifier || ${noticeDetails.title}`
      : "Notice Details | Job Notifier",
    description:
      noticeDetails?.noticeDescription ||
      `Official notice and announcement details for ${noticeDetails?.title || "this update"} on Job Notifier.`,
    canonicalPath: `/notice/${noticeId}`,
    ogType: "article",
    jsonLd: articleSchema,
  });

  useEffect(() => {
    fetchNoticeById(noticeId);
  }, []);

  return (
    <>
      <WhatsAppPromotion />

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

      {!isNoticeLoading && (
        <NoticeDetailsCard
          {...noticeDetails}
          isArchivedNotice={noticeDetails?.isActive}
        />
      )}
    </>
  );
}

export default NoticeDetailsPage;
