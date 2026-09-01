import {
  Close,
  ContentCopy,
  Done,
  Download,
  ExpandMore,
  InfoOutlined,
  OpenInNew,
  Share,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import Markdown from "react-markdown";
import useAppCss from "../hooks/useAppCss";
import useJobDetails from "../hooks/useJobDetails";
import { AppConstants } from "../app/AppConstants";
import Notes from "../components/Notes";
import ShareDialog from "../components/core/ShareDialog";
import PdfOpenerDialog from "../components/core/PdfOpenerDialog";
import remarkGfm from "remark-gfm";
import useAppliedJob from "../hooks/useAppliedJob";
import AppAlert from "../components/AppAlert";
import JobApplyPrompt from "../components/JobApplyPrompt";

function JobDetailsCard({
  applicationId,
  title,
  applicationStartDate,
  applicationEndDate,
  tags,
  shortDescription,
  applyLink,
  advNo,
  viewPageDescription,
  advFilePath,
  userAuthStatus,
}) {
  const theme = useTheme();
  const md = theme.breakpoints.values.md;
  const { GlobalAccordianCss } = useAppCss();
  const {
    copyDetailedAdv,
    isCopying,
    shareDialogOpen,
    shareUrl,
    advertisement,
    isDownloading,
    isPdfDialogOpen,
    handlePdfDialogOnClose,
    openShareDialog,
    closeShareDialog,
    downloadAdv,
  } = useJobDetails();

  const isUserLoggedIn =
    userAuthStatus?.trim()?.toLowerCase() === AppConstants.USER_AUTH_STATUS;
  const {
    showAppliedPrompt,
    isMarking,
    isMarked,
    alert,
    handleAlertOnClose,
    handleApplyClick,
    handleYesClick,
    handleNoClick,
  } = useAppliedJob();

  return (
    <Box
      component="div"
      sx={{ minHeight: "223px", maxWidth: `${md}px`, mx: "auto", mb: 2 }}
    >
      <Card variant="elevation" elevation={4}>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 700 }} color="primary">
            {title}
          </Typography>

          {advNo && (
            <Typography variant="caption" color="secondary">
              Advertisement No: {advNo}
            </Typography>
          )}

          <Box component="div" sx={{ display: "flex", flexWrap: "wrap" }}>
            {tags?.split(",")?.map((tag) => (
              <Chip
                label={tag.trim()}
                key={tag}
                sx={(theme) => ({
                  mr: 1,
                  mb: 1,
                  borderRadius: "8px",
                })}
                color="success"
                icon={<InfoOutlined fontSize="small" />}
              />
            ))}
          </Box>

          <Box
            component="div"
            sx={{
              display: "flex",
              columnGap: 1,
              flexWrap: "wrap",
              my: 1,
              flexDirection: "column",
            }}
          >
            <Typography variant="body2">
              Application Start Date: {applicationStartDate}
            </Typography>
            <Typography variant="body2">
              Application End Date: {applicationEndDate}
            </Typography>
          </Box>

          <Divider />

          <Box
            component="div"
            sx={{ mb: 2, fontFamily: "Arial", textAlign: "justify" }}
          >
            <Typography
              variant="body1"
              sx={{
                my: 1,
                py: 1,
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              Description
            </Typography>

            <Markdown remarkPlugins={[remarkGfm]}>{shortDescription}</Markdown>
          </Box>

          {viewPageDescription && (
            <Accordion sx={GlobalAccordianCss} defaultExpanded>
              <AccordionSummary
                aria-controls={`detailed-adv-content`}
                id={`detailed-adv-header`}
                expandIcon={<ExpandMore fontSize="small" />}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: theme.palette.primary.A700,
                  }}
                >
                  Detailed Advertisement
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Box
                  component="div"
                  sx={{ mb: 2, fontFamily: "Arial", textAlign: "justify" }}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {viewPageDescription}
                  </Markdown>
                </Box>
              </AccordionDetails>

              <AccordionActions>
                <Button
                  variant="outlined"
                  startIcon={
                    isCopying ? (
                      <CircularProgress size={16} color="secondary" />
                    ) : (
                      <ContentCopy fontSize="small" />
                    )
                  }
                  onClick={() => copyDetailedAdv(viewPageDescription)}
                  disabled={isCopying}
                >
                  Copy
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Share fontSize="small" />}
                  onClick={openShareDialog}
                >
                  Share
                </Button>
              </AccordionActions>
            </Accordion>
          )}

          <Box sx={{ mt: 4 }}>
            <Notes
              note="Please note that detailed advertisement accordion is only a detailed summary of full advertisement. Please download full advertisement to know completely about this vacancy."
              noteColor={theme.palette.secondary.main}
            />

            <Notes
              note="Please register and login yourself to get regular notifications regarding new job openings."
              noteColor={theme.palette.secondary.main}
            />

            <Notes
              note="Kindly double check your eligibility before applying to any vacancy."
              noteColor={theme.palette.secondary.main}
            />
          </Box>
        </CardContent>

        <CardActionArea
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 0.5,
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            href={applyLink}
            target="_blank"
            startIcon={<OpenInNew fontSize="small" />}
            onClick={() => {
              if (isUserLoggedIn) {
                handleApplyClick();
              }
            }}
          >
            Apply
          </Button>

          <Button
            variant="contained"
            startIcon={
              isDownloading ? (
                <CircularProgress size={16} color="secondary" />
              ) : (
                <Download fontSize="small" />
              )
            }
            disabled={isDownloading || !advFilePath}
            onClick={async () => await downloadAdv(advFilePath)}
          >
            Download Advertisement
          </Button>
        </CardActionArea>
      </Card>

      {showAppliedPrompt && isUserLoggedIn && (
        <Paper elevation={4} sx={{ mt: 2, p: 2 }}>
          <AppAlert
            alert={alert}
            handleAlertOnClose={handleAlertOnClose}
            type={alert?.type}
          />

          {!isMarked ? (
            <JobApplyPrompt
              handleNoClick={handleNoClick}
              handleYesClick={handleYesClick}
              isMarking={isMarking}
              applicationId={applicationId}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="success.main" gutterBottom>
                Successfully marked as applied!
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleNoClick}
                sx={{ mt: 1 }}
              >
                Close
              </Button>
            </Box>
          )}
        </Paper>
      )}

      <ShareDialog
        open={shareDialogOpen}
        onClose={closeShareDialog}
        url={shareUrl}
        recruitmentDesc={shortDescription}
        recruitmentTitle={title}
        title="Share this content"
      />

      {advertisement && !isDownloading && isPdfDialogOpen && (
        <PdfOpenerDialog
          isOpen={isPdfDialogOpen}
          onClose={handlePdfDialogOnClose}
          pdfBlob={advertisement}
          title={title}
          isDownloadable
        />
      )}
    </Box>
  );
}

JobDetailsCard.propTypes = {
  applicationId: PropTypes.string,
  title: PropTypes.string.isRequired,
  applicationStartDate: PropTypes.string.isRequired,
  applicationEndDate: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  shortDescription: PropTypes.string.isRequired,
  applyLink: PropTypes.string.isRequired,
  advNo: PropTypes.string.isRequired,
  viewPageDescription: PropTypes.string.isRequired,
  advFilePath: PropTypes.string,
  userAuthStatus: PropTypes.string,
};

export default React.memo(JobDetailsCard);
