import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Divider, Button, CircularProgress } from '@mui/material';
import { Close, Done } from '@mui/icons-material';

function JobApplyPrompt({ handleNoClick, handleYesClick, isMarking, applicationId }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" color="primary">
        Thanks for applying, please answer one small question given below. This will help us and you in keeping the track of your applied jobs.
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="h6" color="primary">
        Q. Did you applied for this job?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", gap: 2, mt: 1 }}>
        <Button variant="outlined" color="error" onClick={handleNoClick} disabled={isMarking} startIcon={<Close fontSize="small" />}>
          NO
        </Button>
        <Button variant="contained" color="success" onClick={() => handleYesClick(applicationId)} disabled={isMarking} startIcon={isMarking ? <CircularProgress size={16} color="secondary" /> : <Done fontSize="small" />}>
          YES
        </Button>
      </Box>
    </Box>
  );
}

JobApplyPrompt.propTypes = {
  handleNoClick: PropTypes.func.isRequired,
  handleYesClick: PropTypes.func.isRequired,
  isMarking: PropTypes.bool.isRequired,
  applicationId: PropTypes.string.isRequired,
};

export default React.memo(JobApplyPrompt);
