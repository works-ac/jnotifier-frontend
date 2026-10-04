import React from "react";
import useNotices from "../hooks/features/useNotices";
import AppAlert from "../components/AppAlert";
import CircluarProgressLoader from "../components/CircluarProgressLoader";
import { Box, Button, Container, Typography } from "@mui/material";
import { SkipNext, SkipPrevious } from "@mui/icons-material";
import NoticeListingCard from "../views/NoticeListingCard";
import NoJobFoundImage from "../assets/notfound.jpg";
import ListFilters from "../components/core/ListFilters";
import useSEO from "../hooks/useSEO";
import WhatsAppPromotion from "../components/core/WhatsAppPromotion";

function NoticePage() {
  useSEO({
    title: "Official Notices & Recruitment Announcements | Job Notifier",
    description:
      "Stay updated with recent government and private job notices, recruitment announcements, examination schedules, admit cards, and result updates on Job Notifier.",
    canonicalPath: "/notices",
  });

  const {
    fetchNextNotice,
    fetchPreviousNotice,
    handleAlertOnClose,
    fetchAllNotices,
    fetchAllNoticesByCategory,
    fetchNextNoticeByCategory,
    fetchPreviousNoticeByCategory,
    isFilterMode,
    isLoading,
    alert,
    notices,
    paginationMetadata,
  } = useNotices();

  return (
    <>
      <WhatsAppPromotion />

      <AppAlert
        alert={alert}
        handleAlertOnClose={handleAlertOnClose}
        type={alert?.type}
      />

      {isLoading && (
        <CircluarProgressLoader
          text="We're fetching the latest notices, please give us a moment..."
          takeHeight
        />
      )}

      {!isLoading && (
        <>
          {!!notices.length && (
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography variant="caption">
                Showing page no. {paginationMetadata.pageNo + 1} of{" "}
                {paginationMetadata.totalPages}
              </Typography>
            </Box>
          )}

          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">
              Total {paginationMetadata.totalElements} active notices.
            </Typography>
          </Box>

          <ListFilters
            onReset={fetchAllNotices}
            onSubmit={fetchAllNoticesByCategory}
          />

          {!!notices.length && (
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
              }}
            >
              <Button
                variant="outlined"
                disabled={paginationMetadata.first}
                startIcon={<SkipPrevious fontSize="small" />}
                onClick={
                  isFilterMode
                    ? fetchPreviousNoticeByCategory
                    : fetchPreviousNotice
                }
              >
                Previous
              </Button>

              <Button
                variant="outlined"
                disabled={paginationMetadata.last}
                endIcon={<SkipNext fontSize="small" />}
                onClick={
                  isFilterMode ? fetchAllNoticesByCategory : fetchNextNotice
                }
              >
                Next
              </Button>
            </Box>
          )}

          {notices.map((notice) => (
            <NoticeListingCard
              id={notice.id}
              noticeDescription={notice.noticeDescription}
              tags={notice.tags}
              title={notice.title}
              key={notice.id}
              createdBy={notice.createdBy}
              createdAt={notice.createdAt}
            />
          ))}

          {!!notices.length && (
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                disabled={paginationMetadata.first}
                startIcon={<SkipPrevious fontSize="small" />}
                onClick={
                  isFilterMode
                    ? fetchPreviousNoticeByCategory
                    : fetchPreviousNotice
                }
              >
                Previous
              </Button>

              <Button
                variant="outlined"
                disabled={paginationMetadata.last}
                endIcon={<SkipNext fontSize="small" />}
                onClick={
                  isFilterMode ? fetchNextNoticeByCategory : fetchNextNotice
                }
              >
                Next
              </Button>
            </Box>
          )}

          {!notices.length && (
            <Container
              maxWidth="lg"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                component="img"
                src={NoJobFoundImage}
                alt="No active notices found"
                width="50%"
                height="50%"
                sx={{ borderRadius: 10, mb: 2 }}
              />

              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Sorry, currently no active notice(s) are available.
              </Typography>
            </Container>
          )}
        </>
      )}
    </>
  );
}

export default React.memo(NoticePage);
