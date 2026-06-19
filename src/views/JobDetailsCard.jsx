import {
  Download,
  ExpandMore,
  OpenInNew,
  Visibility,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes, { element } from "prop-types";
import React from "react";

function JobDetailsCard({
  applicationId,
  title,
  applicationStartDate,
  applicationEndDate,
  tags,
  shortDescription,
  applyLink,
  advNo,
  components,
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
          <Typography variant="h4" sx={{ fontWeight: 700 }} color="primary">
            {title}
          </Typography>

          <Typography variant="caption" color="secondary">
            Advertisement No: {advNo}
          </Typography>

          <Box component="div" sx={{ display: "flex", flexWrap: "wrap" }}>
            {tags?.map((tag) => (
              <Chip
                label={tag}
                key={tag}
                sx={(theme) => ({
                  mr: 1,
                  mb: 1,
                  borderRadius: "8px",
                })}
                color="success"
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

          <Box
            component="div"
            dangerouslySetInnerHTML={{ __html: shortDescription }}
            sx={{ mb: 2, fontFamily: "Arial", textAlign: "justify" }}
          ></Box>

          {components
            ?.filter((item) => item.componentDescription)
            ?.sort((a, b) => a.order - b.order)
            ?.map((component, index) => (
              <Accordion key={component.order} sx={{ my: 2 }}>
                <AccordionSummary
                  aria-controls={`panel${index + 1}a-content`}
                  id={`panel${index + 1}a-header`}
                  expandIcon={<ExpandMore fontSize="large" />}
                  sx={{ backgroundColor: "#e6e6e6" }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700 }}
                    color="primary"
                  >
                    {component.componentName}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Box
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: component.componentDescription,
                    }}
                    sx={{
                      fontFamily: "Arial, sans-serif",
                      textAlign: "justify",
                    }}
                  ></Box>
                </AccordionDetails>
              </Accordion>
            ))}
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
            startIcon={<OpenInNew fontSize="small" />}
            href={applyLink}
            target="_blank"
          >
            Apply
          </Button>

          <Button
            variant="contained"
            startIcon={<Download fontSize="small" />}
            target="_blank"
          >
            Download Advertisement
          </Button>
        </CardActionArea>
      </Card>
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
  components: PropTypes.array,
};

export default React.memo(JobDetailsCard);
