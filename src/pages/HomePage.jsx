import React from "react";
import JobListingCard from "../views/JobListingCard";
import useHome from "../hooks/useHome";
import AppAlert from "../components/AppAlert";
import CircluarProgressLoader from "../components/CircluarProgressLoader";
import { Box, Button, Container, Typography } from "@mui/material";
import { SkipNext, SkipPrevious } from "@mui/icons-material";
import NoJobFoundImage from "../assets/notfound.jpg";

function HomePage() {
  const {
    alert,
    handleAlertOnClose,
    isLoading,
    jobs,
    paginationMetadata,
    fetchNextJob,
    fetchPreviousJob,
  } = useHome();

  return (
    <>
      <AppAlert
        alert={alert}
        handleAlertOnClose={handleAlertOnClose}
        type={alert?.type}
      />

      {isLoading && (
        <CircluarProgressLoader
          text="We're fetching the latest jobs, please give us a moment..."
          takeHeight
        />
      )}

      {!isLoading && (
        <>
          {jobs.length && (
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
              Total {paginationMetadata.totalElements} active vacancies.
            </Typography>
          </Box>

          {jobs.length && (
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
                disabled={paginationMetadata.pageNo === 0}
                startIcon={<SkipPrevious fontSize="small" />}
                onClick={fetchPreviousJob}
              >
                Previous
              </Button>

              <Button
                variant="outlined"
                disabled={paginationMetadata.last}
                endIcon={<SkipNext fontSize="small" />}
                onClick={fetchNextJob}
              >
                Next
              </Button>
            </Box>
          )}

          {jobs.map((job) => (
            <JobListingCard
              applicationId={job.applicationId}
              applicationEndDate={job.applicationEndDate}
              applicationStartDate={job.applicationStartDate}
              shortDescription={job.shortDescription}
              tags={job.tags}
              title={job.title}
              viewMoreLink={`/jobs/${job.applicationId}`}
              advNo={job.advNo}
              key={job.applicationId}
              createdBy={job.createdBy}
              createdAt={job.createdAt}
            />
          ))}

          {jobs.length && (
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
                disabled={paginationMetadata.pageNo === 0}
                startIcon={<SkipPrevious fontSize="small" />}
                onClick={fetchPreviousJob}
              >
                Previous
              </Button>

              <Button
                variant="outlined"
                disabled={paginationMetadata.last}
                endIcon={<SkipNext fontSize="small" />}
                onClick={fetchNextJob}
              >
                Next
              </Button>
            </Box>
          )}

          {!jobs.length && (
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
                Sorry, currently no active job postings are available.
              </Typography>
            </Container>
          )}
        </>
      )}
    </>
  );
}

export default React.memo(HomePage);
