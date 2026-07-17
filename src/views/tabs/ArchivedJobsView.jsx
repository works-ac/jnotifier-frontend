import React from "react";
import useArchivedJobsView from "../../hooks/features/useArchivedJobsView";
import { SkipNext, SkipPrevious } from "@mui/icons-material";
import NoJobFoundImage from "../../assets/notfound.jpg";
import AppAlert from "../../components/AppAlert";
import CircluarProgressLoader from "../../components/CircluarProgressLoader";
import { Box, Button, Container, Typography } from "@mui/material";
import JobListingCard from "../JobListingCard";

function ArchivedJobsView() {
  const {
    alert,
    archivedJobs,
    fetchPreviousArchivedJobs,
    fetchNextArchivedJobs,
    handleAlertOnClose,
    isLoading,
    paginationMetadata,
  } = useArchivedJobsView();

  return (
    <>
      <AppAlert
        alert={alert}
        handleAlertOnClose={handleAlertOnClose}
        type={alert?.type}
      />

      {isLoading && (
        <CircluarProgressLoader
          text="We're fetching the archived jobs, please give us a moment..."
          takeHeight
        />
      )}

      {!isLoading && (
        <>
          {archivedJobs.length ? (
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
              Total {paginationMetadata.totalElements} archived jobs.
            </Typography>
          </Box>

          {archivedJobs.map((job) => (
            <>
              <JobListingCard key={job.applicationId} {...job} />

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
                  onClick={fetchPreviousArchivedJobs}
                >
                  Previous
                </Button>

                <Button
                  variant="outlined"
                  disabled={paginationMetadata.last}
                  endIcon={<SkipNext fontSize="small" />}
                  onClick={fetchNextArchivedJobs}
                >
                  Next
                </Button>
              </Box>
            </>
          ))}

          {!archivedJobs.length && (
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
                Sorry, currently no archived job(s) are available.
              </Typography>
            </Container>
          )}
        </>
      )}
    </>
  );
}

export default ArchivedJobsView;
