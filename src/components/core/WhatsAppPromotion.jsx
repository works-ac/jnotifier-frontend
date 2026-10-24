import { FilterAlt, WhatsApp } from "@mui/icons-material";
import { Badge, Button, IconButton, Stack } from "@mui/material";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import AppToolTip from "./AppToolTip";
import { AppVariables } from "../../app/AppVariables";

function WhatsAppPromotion({
  onFilterToggle,
  showFilter = false,
  isFilterActive = false,
  children,
}) {
  const whatsappChannelUri = useMemo(
    () => AppVariables.WHATSAPP_CHANNEL_LINK,
    [],
  );

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ justifyContent: "flex-end", alignItems: "center", mb: 1.5 }}
    >
      {onFilterToggle && (
        <AppToolTip
          title={showFilter ? "Hide category filter" : "Filter by category"}
          placement="top"
        >
          <IconButton
            onClick={onFilterToggle}
            aria-label="Filter by category"
            size="small"
            sx={(theme) => ({
              p: "7px",
              border: "1px solid",
              borderColor: showFilter
                ? theme.palette.primary.main
                : theme.palette.secondary.A100,
              backgroundColor: showFilter
                ? theme.palette.primary.main
                : "transparent",
              color: showFilter ? "#ffffff" : theme.palette.primary.main,
              borderRadius: "8px",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: showFilter
                  ? theme.palette.primary.hover
                  : theme.palette.secondary.A50,
                borderColor: theme.palette.primary.main,
              },
            })}
          >
            <Badge
              color="error"
              variant="dot"
              invisible={!isFilterActive}
              sx={{
                "& .MuiBadge-badge": {
                  right: -2,
                  top: -2,
                },
              }}
            >
              <FilterAlt fontSize="small" />
            </Badge>
          </IconButton>
        </AppToolTip>
      )}

      {children}

      <AppToolTip
        title="Join our growing WhatsApp channel to receive instant job alerts and updates."
        placement="top"
      >
        <Button
          startIcon={<WhatsApp fontSize="small" />}
          variant="outlined"
          color="success"
          size="small"
          sx={{ p: 1 }}
          href={whatsappChannelUri}
          target="_blank"
          referrerPolicy="no-referrer"
        >
          WhatsApp Channel
        </Button>
      </AppToolTip>
    </Stack>
  );
}

WhatsAppPromotion.propTypes = {
  onFilterToggle: PropTypes.func,
  showFilter: PropTypes.bool,
  isFilterActive: PropTypes.bool,
  children: PropTypes.node,
};

export default React.memo(WhatsAppPromotion);
