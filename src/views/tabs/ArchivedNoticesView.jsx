import React from "react";
import useArchivedNoticesView from "../../hooks/features/useArchivedNoticesView";
import AppAlert from "../../components/AppAlert";
import CircluarProgressLoader from "../../components/CircluarProgressLoader";
import { Box, Button, Container, Typography } from "@mui/material";
import NoticeListingCard from "../NoticeListingCard";
import { SkipNext, SkipPrevious } from "@mui/icons-material";
import NoJobFoundImage from "../../assets/notfound.jpg";

function ArchivedNoticesView() {
  const {
    alert,
    archivedNotices,
    fetchNextArchivedNotice,
    fetchPreviousArchivedNotice,
    handleAlertOnClose,
    isLoading,
    paginationMetadata,
  } = useArchivedNoticesView();

  return (
    <>
      <AppAlert
        alert={alert}
        handleAlertOnClose={handleAlertOnClose}
        type={alert?.type}
      />

      {isLoading && (
        <CircluarProgressLoader
          text="We're fetching the archived notices, please give us a moment..."
          takeHeight
        />
      )}

      {!isLoading && (
        <>
          {archivedNotices.length ? (
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
          ) : (
            <></>
          )}

          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">
              Total {paginationMetadata.totalElements} archived notices.
            </Typography>
          </Box>

          {archivedNotices.map((notice) => (
            <>
              <NoticeListingCard
                id={notice.id}
                noticeDescription={notice.noticeDescription}
                tags={notice.tags}
                title={notice.title}
                key={notice.title}
              />

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
                  onClick={fetchPreviousArchivedNotice}
                >
                  Previous
                </Button>

                <Button
                  variant="outlined"
                  disabled={paginationMetadata.last}
                  endIcon={<SkipNext fontSize="small" />}
                  onClick={fetchNextArchivedNotice}
                >
                  Next
                </Button>
              </Box>
            </>
          ))}

          {!archivedNotices.length && (
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
                width="50%"
                height="50%"
                sx={{ borderRadius: 10, mb: 2 }}
              />

              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Sorry, currently no archived notice(s) are available.
              </Typography>
            </Container>
          )}
        </>
      )}
    </>
  );
}

export default React.memo(ArchivedNoticesView);
