import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import JobDetailsCard from "../views/JobDetailsCard";
import useHome from "../hooks/useHome";
import AppAlert from "../components/AppAlert";
import CircluarProgressLoader from "../components/CircluarProgressLoader";
import { Container, Paper, Typography } from "@mui/material";
import useAppCss from "../hooks/useAppCss";
import DogPic from "../assets/dog.png";
import FlexBox from "../components/styled/FlexBox";
import ResponsiveImage from "../components/core/ResponsiveImage";
import { useSelector } from "react-redux";
import useLoginStatus from "../hooks/core/useLoginStatus";

function JobDetailsPage() {
  const { applicationId } = useParams();
  const { GlobalPaperCss } = useAppCss();
  const {
    alert,
    fetchJobByApplicationId,
    handleAlertOnClose,
    isJobDetailsLoading,
    jobDetails,
  } = useHome();
  const { isLoading } = useLoginStatus();
  const { userAuthStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (jobDetails) document.title = `Job Notifier || ${jobDetails.title}`;
  }, [jobDetails]);

  useEffect(() => {
    fetchJobByApplicationId(applicationId);
  }, []);

  if (isLoading)
    return (
      <CircluarProgressLoader
        text="We're checking your authentication status, please wait..."
        takeHeight
      />
    );

  return (
    <>
      <AppAlert
        alert={alert}
        handleAlertOnClose={handleAlertOnClose}
        type={alert?.type}
      />

      {isJobDetailsLoading && (
        <CircluarProgressLoader
          text={`We're loading up the details of job bearing id ${applicationId}, please wait....`}
          takeHeight
        />
      )}

      {!isJobDetailsLoading && jobDetails && (
        <JobDetailsCard
          advNo={jobDetails.advNo}
          applicationEndDate={jobDetails.applicationEndDate}
          applicationStartDate={jobDetails.applicationStartDate}
          applicationId={jobDetails.applicationId}
          applyLink={jobDetails.applyLink}
          components={jobDetails.components}
          shortDescription={jobDetails.shortDescription}
          tags={jobDetails.tags}
          title={jobDetails.title}
          viewPageDescription={jobDetails.viewPageDescription}
          advFilePath={jobDetails.advFilePath}
          userAuthStatus={userAuthStatus}
        />
      )}

      {!isJobDetailsLoading && !jobDetails && (
        <Container>
          <Paper variant="elevation" elevation={2} sx={GlobalPaperCss}>
            <FlexBox
              sx={{
                gap: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ResponsiveImage
                src={DogPic}
                alt="dog"
                aspectRatio="16/9"
                maxWidth="45%"
                objectFit="cover"
              />

              <Typography variant="h2" sx={{ fontWeight: 700 }} color="error">
                Sorry, we're currently facing some technical issues right now,
                please try again later.
              </Typography>
            </FlexBox>
          </Paper>
        </Container>
      )}
    </>
  );
}

export default JobDetailsPage;
