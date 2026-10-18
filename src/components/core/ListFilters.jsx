import PropTypes from "prop-types";
import React from "react";
import FlexBox from "../styled/FlexBox";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useListFilters from "../../hooks/core/useListFilters";
import AppAlert from "../AppAlert";
import { Filter, FilterAlt, Restore } from "@mui/icons-material";

function ListFilters({ onSubmit, onReset }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    alert,
    category,
    isLoading,
    jobCategories,
    handleCategoryOnChange,
    handleAlertOnClose,
  } = useListFilters();

  if (isLoading) return <></>;

  if (typeof onReset !== "function" || typeof onSubmit !== "function")
    return <></>;

  if (isMobile)
    return (
      <Paper
        component="div"
        sx={(theme) => ({
          my: 1,
          border: `1px solid ${theme.palette.secondary.A100}}`,
          borderRadius: "10px",
          width: "100%",
        })}
      >
        <AppAlert
          alert={alert}
          handleAlertOnClose={handleAlertOnClose}
          type={alert?.type}
        />

        <Box component="div" sx={{ p: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Filter by Category
          </Typography>

          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Autocomplete
                value={category}
                onChange={handleCategoryOnChange}
                disablePortal
                options={jobCategories}
                getOptionKey={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Choose a category" required />
                )}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<FilterAlt fontSize="small" />}
                onClick={() => onSubmit(category)}
                disabled={isLoading || !category}
              >
                Apply
              </Button>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                color="error"
                startIcon={<Restore fontSize="small" />}
                onClick={onReset}
                disabled={isLoading}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    );

  return (
    <Container maxWidth="lg" sx={{ mx: "auto" }}>
      <Paper
        component="div"
        sx={(theme) => ({
          my: 1,
          border: `1px solid ${theme.palette.secondary.A100}}`,
          borderRadius: "10px",
          width: "100%",
        })}
      >
        <AppAlert
          alert={alert}
          handleAlertOnClose={handleAlertOnClose}
          type={alert?.type}
        />

        <Box component="div" sx={{ p: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Filter by Category
          </Typography>

          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Autocomplete
                disablePortal
                options={jobCategories}
                getOptionKey={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Choose a category" required />
                )}
                fullWidth
                value={category}
                onChange={handleCategoryOnChange}
              />
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<FilterAlt fontSize="small" />}
                onClick={() => onSubmit(category)}
                disabled={isLoading || !category}
              >
                Apply
              </Button>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                color="error"
                startIcon={<Restore fontSize="small" />}
                onClick={onReset}
                disabled={isLoading}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

ListFilters.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default React.memo(ListFilters);
