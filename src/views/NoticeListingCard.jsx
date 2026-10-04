import { Sell, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import Markdown from "react-markdown";
import FlexBox from "../components/styled/FlexBox";
import dayjs from "dayjs";

function NoticeListingCard({
  id,
  title,
  tags,
  noticeDescription,
  createdBy,
  createdAt,
}) {
  const theme = useTheme();
  const md = theme.breakpoints.values.md;

  return (
    <Box
      component="div"
      sx={{ minHeight: "223px", maxWidth: `${md}px`, mx: "auto", mb: 2 }}
    >
      <Card variant="elevation" elevation={4}>
        <CardContent>
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

          <FlexBox sx={{ flexDirection: "column", alignItems: "flex-end" }}>
            <Typography variant="caption" color="secondary">
              Posted By: {createdBy}
            </Typography>

            <Typography variant="caption" color="secondary">
              Posted On: {dayjs(createdAt).format("DD/MM/YYYY")}
            </Typography>
          </FlexBox>

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
        </CardContent>

        <CardActionArea
          sx={{ display: "flex", justifyContent: "flex-end", p: 0.5 }}
        >
          <Button
            variant="contained"
            startIcon={<Visibility fontSize="small" />}
            href={`/notice/${id}`}
            target="_blank"
          >
            View
          </Button>
        </CardActionArea>
      </Card>
    </Box>
  );
}

NoticeListingCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  noticeDescription: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default React.memo(NoticeListingCard);
