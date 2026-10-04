import React from "react";
import { Box, Card, CardContent, Typography, CircularProgress, Pagination, Button, useTheme, Divider } from "@mui/material";
import { OpenInNew, Work } from "@mui/icons-material";
import useAppliedJobsList from "../hooks/useAppliedJobsList";
import AppAlert from "./AppAlert";
import Heading from "./Heading";
import useAppCss from "../hooks/useAppCss";
import { Link } from "react-router-dom";

function AppliedJobsList() {
  const theme = useTheme();
  const { GlobalPaperCss } = useAppCss();
  const {
    jobs,
    isLoading,
    page,
    totalPages,
    alert,
    handleAlertOnClose,
    handlePageChange
  } = useAppliedJobsList();

  return (
    <Box>
      <Heading
        Icon={Work}
        color={theme.palette.primary.main}
        iconColor={theme.palette.warning.main}
        text="Applied Jobs"
        mb={0}
      />
      <Divider sx={{ my: 2 }} />

      <AppAlert alert={alert} handleAlertOnClose={handleAlertOnClose} type={alert?.type} />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          {jobs.length === 0 ? (
            <Typography variant="body1" align="center" color="text.secondary">
              You haven't applied to any jobs yet.
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {jobs.map(job => (
                <Card key={job.id} variant="outlined">
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Typography variant="h6" color="primary">{job.title}</Typography>
                      {job.advertisementNo && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          Adv No: {job.advertisementNo}
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Applied on: {new Date(job.appliedOn).toLocaleString()}
                      </Typography>
                    </Box>
                    <Button 
                      component={Link} 
                      to={`/jobs/${job.applicationId}`}
                      variant="outlined" 
                      startIcon={<OpenInNew />}
                    >
                      View Job
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination 
                count={totalPages} 
                page={page + 1} 
                onChange={handlePageChange} 
                color="primary" 
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default React.memo(AppliedJobsList);
