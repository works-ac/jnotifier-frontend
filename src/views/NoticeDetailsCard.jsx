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
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import Markdown from "react-markdown";
import useAppCss from "../hooks/useAppCss";
import ShareDialog from "../components/core/ShareDialog";
import useJobDetails from "../hooks/useJobDetails";
import PropTypes from "prop-types";

import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import AppToolTip from "../components/core/AppToolTip";

function NoticeDetailsCard({
  id,
  title,
  tags,
  noticeDescription,
  noticeDetailedAdv,
  isArchivedNotice = false,
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
          {!isArchivedNotice && (
            <Stack direction="row" sx={{ mb: 1, justifyContent: "flex-end" }}>
              <Box
                component="div"
                sx={{
                  backgroundColor: theme.palette.error.main,
                  p: 1,
                  borderRadius: 2,
                  outline: "none",
                  color: "white",
                }}
              >
                <AppToolTip title="This notice is archived." placement="left">
                  <Typography variant="body1">ARCHIVED</Typography>
                </AppToolTip>
              </Box>
            </Stack>
          )}

          <Stack direction="column" sx={{ mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }} color="primary">
              {title}
            </Typography>

            <Typography variant="caption" color="secondary">
              Notice ID: {id}
            </Typography>
          </Stack>

          <Box component="div" sx={{ display: "flex", flexWrap: "wrap" }}>
            {tags?.split(",")?.map((tag) => (
              <Chip
                label={tag?.trim()}
                key={tag}
                sx={{
                  mr: 1,
                  mb: 1,
                  borderRadius: "8px",
                }}
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

            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                rehypeRaw,
                [
                  rehypeSanitize,
                  {
                    ...defaultSchema,
                    // 1. Define exactly which tags you want to allow
                    tagNames: [
                      "p",
                      "br",
                      "b",
                      "strong",
                      "i",
                      "em",
                      "table",
                      "thead",
                      "tbody",
                      "tr",
                      "th",
                      "td",
                      "ul",
                      "ol",
                      "li",
                      "a",
                      "h1",
                      "h2",
                      "h3",
                      "h4",
                      "h5",
                      "h6",
                    ],
                    // 2. Optionally restrict attributes (like allowing 'className' on paragraphs)
                    attributes: {
                      ...defaultSchema.attributes,
                      "*": ["className"], // allows classes on all permitted tags
                    },
                  },
                ],
              ]}
            >
              {noticeDescription}
            </Markdown>
          </Box>

          {noticeDetailedAdv && (
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
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[
                      rehypeRaw,
                      [
                        rehypeSanitize,
                        {
                          ...defaultSchema,
                          // 1. Define exactly which tags you want to allow
                          tagNames: [
                            "p",
                            "br",
                            "b",
                            "strong",
                            "i",
                            "em",
                            "table",
                            "thead",
                            "tbody",
                            "tr",
                            "th",
                            "td",
                            "ul",
                            "ol",
                            "li",
                            "a",
                            "h1",
                            "h2",
                            "h3",
                            "h4",
                            "h5",
                            "h6",
                          ],
                          // 2. Optionally restrict attributes (like allowing 'className' on paragraphs)
                          attributes: {
                            ...defaultSchema.attributes,
                            "*": ["className"], // allows classes on all permitted tags
                          },
                        },
                      ],
                    ]}
                  >
                    {noticeDetailedAdv}
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
          )}

          {!noticeDetailedAdv && (
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                my: 1,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<Share fontSize="small" />}
                onClick={openShareDialog}
              >
                Share
              </Button>
            </Box>
          )}
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

NoticeDetailsCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  noticeDescription: PropTypes.string.isRequired,
  noticeDetailedAdv: PropTypes.string,
  isArchivedNotice: PropTypes.bool,
};

export default NoticeDetailsCard;
