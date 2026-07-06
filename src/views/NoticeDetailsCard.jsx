import { ContentCopy, ExpandMore, Sell, Share } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import Markdown from "react-markdown";
import useAppCss from "../hooks/useAppCss";
import ShareDialog from "../components/core/ShareDialog";
import useJobDetails from "../hooks/useJobDetails";

function NoticeDetailsCard({
  id,
  title,
  tags,
  noticeDescription,
  noticeDetailedAdv,
}) {
  const theme = useTheme();
  const md = theme.breakpoints.values.md;
  const { GlobalAccordianCss } = useAppCss();
  const {
    copyDetailedAdv,
    isCopying,
    shareDialogOpen,
    shareUrl,
    openShareDialog,
    closeShareDialog,
  } = useJobDetails();

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

          <Box component="div" sx={{ display: "flex", flexWrap: "wrap" }}>
            {tags?.split(",")?.map((tag) => (
              <Chip
                label={tag?.trim()}
                key={tag}
                sx={(theme) => ({
                  mr: 1,
                  mb: 1,
                  borderRadius: "8px",
                })}
                color="success"
                icon={<Sell fontSize="small" />}
              />
            ))}
          </Box>

          <Divider />

          <Box sx={{ textAlign: "justify", p: 1 }}>
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

            <Markdown>{noticeDescription}</Markdown>
          </Box>

          <Accordion sx={GlobalAccordianCss} defaultExpanded>
            <AccordionSummary
              aria-controls={`detailed-notice-content`}
              id={`detailed-notice-header`}
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
                Detailed Notice
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Box
                component="div"
                sx={{ mb: 2, fontFamily: "Arial", textAlign: "justify" }}
              >
                <Markdown>{noticeDetailedAdv}</Markdown>
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
                onClick={() => copyDetailedAdv(noticeDetailedAdv)}
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
        </CardContent>
      </Card>

      <ShareDialog
        open={shareDialogOpen}
        onClose={closeShareDialog}
        url={shareUrl}
        recruitmentDesc={noticeDescription}
        recruitmentTitle={title}
        title="Share this content"
      />
    </Box>
  );
}

export default NoticeDetailsCard;
