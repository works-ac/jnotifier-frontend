import React from "react";
import useNotices from "../hooks/features/useNotices";
import AppAlert from "../components/AppAlert";
import CircluarProgressLoader from "../components/CircluarProgressLoader";
import { Box, Button, Chip, Container, Typography } from "@mui/material";
import { SkipNext, SkipPrevious } from "@mui/icons-material";
import NoticeListingCard from "../views/NoticeListingCard";
import NoJobFoundImage from "../assets/notfound.jpg";

function NoticePage() {
  const {
    alert,
    fetchNextNotice,
    fetchPreviousNotice,
    handleAlertOnClose,
    isLoading,
    notices,
    paginationMetadata,
  } = useNotices();

  return (
    <>
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
          {notices.length && (
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

          {notices.map((notice) => (
            <NoticeListingCard
              id={notice.id}
              noticeDescription={notice.noticeDescription}
              tags={notice.tags}
              title={notice.title}
              key={notice.title}
            />
          ))}

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
                width="50%"
                height="50%"
                sx={{ borderRadius: 10, mb: 2 }}
              />

              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Sorry, currently no active notice(s) are available.
              </Typography>
            </Container>
          )}

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
              onClick={fetchPreviousNotice}
            >
              Previous
            </Button>

            <Button
              variant="outlined"
              disabled={paginationMetadata.last}
              endIcon={<SkipNext fontSize="small" />}
              onClick={fetchNextNotice}
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </>
  );
}

export default NoticePage;
