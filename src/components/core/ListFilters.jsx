import PropTypes from "prop-types";
import React, { useCallback, useMemo } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useListFilters from "../../hooks/core/useListFilters";
import AppAlert from "../AppAlert";
import { Close, FilterAlt, Restore } from "@mui/icons-material";

function ListFilters({ onSubmit, onReset, onClose }) {
  const {
    alert,
    category,
    isLoading,
    jobCategories,
    setCategory,
    handleCategoryOnChange,
    handleAlertOnClose,
  } = useListFilters();

  const selectedOption = useMemo(() => {
    if (!category) return null;
    return (
      jobCategories.find((opt) => opt.label === category) || { label: category }
    );
  }, [category, jobCategories]);

  const handleReset = useCallback(() => {
    setCategory("");
    onReset();
  }, [setCategory, onReset]);

  if (isLoading) return null;

  if (typeof onReset !== "function" || typeof onSubmit !== "function") {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mx: "auto" }}>
      <Paper
        component="div"
        elevation={0}
        sx={(theme) => ({
          my: 2,
          p: { xs: 2, sm: 2.5 },
          borderRadius: "14px",
          border: `1px solid ${theme.palette.secondary.A200}`,
          background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
          boxShadow: "0 4px 16px -2px rgba(15, 23, 42, 0.06)",
          transition: "all 0.3s ease",
        })}
      >
        <AppAlert
          alert={alert}
          handleAlertOnClose={handleAlertOnClose}
          type={alert?.type}
        />

        <Stack
          direction="row"
          sx={{
            mb: 1.5,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "10px",
                backgroundColor: "rgba(0, 0, 128, 0.08)",
                color: theme.palette.primary.main,
              })}
            >
              <FilterAlt fontSize="small" />
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, lineHeight: 1.2, color: "text.primary" }}
              >
                Filter by Category
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Select a domain to discover relevant openings and announcements
              </Typography>
            </Box>
          </Stack>

          {onClose && (
            <IconButton
              size="small"
              onClick={onClose}
              aria-label="Close filter"
              sx={(theme) => ({
                color: theme.palette.secondary.main,
                "&:hover": {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.A50,
                },
              })}
            >
              <Close fontSize="small" />
            </IconButton>
          )}
        </Stack>

        <Grid container spacing={1.5} alignItems="center" sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 7, lg: 8 }}>
            <Autocomplete
              disablePortal
              options={jobCategories}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option?.label || ""
              }
              isOptionEqualToValue={(option, value) =>
                option?.label ===
                (typeof value === "string" ? value : value?.label)
              }
              value={selectedOption}
              onChange={handleCategoryOnChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a category"
                  placeholder="Search or select category..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: "#ffffff",
                    },
                  }}
                />
              )}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 6, md: 2.5, lg: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              startIcon={<FilterAlt fontSize="small" />}
              onClick={() => onSubmit(category)}
              disabled={isLoading || !category}
              sx={{
                borderRadius: "10px",
                py: 1,
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "0 2px 8px rgba(0, 0, 128, 0.25)",
                },
              }}
            >
              Apply
            </Button>
          </Grid>

          <Grid size={{ xs: 6, md: 2.5, lg: 2 }}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              fullWidth
              startIcon={<Restore fontSize="small" />}
              onClick={handleReset}
              disabled={isLoading}
              sx={{
                borderRadius: "10px",
                py: 1,
                fontWeight: 600,
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

ListFilters.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default React.memo(ListFilters);
