import { useTheme } from "@mui/material";
import React, { useMemo } from "react";

function useAppCss() {
  const theme = useTheme();

  const RequiredFieldCss = useMemo(() => ({
    "& .MuiInputLabel-asterisk": {
      color: "red",
    },
  }));

  const RequiredSwitchCss = useMemo(() => ({
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  }));

  const GlobalPaperCss = useMemo(() => ({
    padding: { xs: "1.5rem", md: "2.5rem" },
    borderRadius: "16px",
    width: "100%",
    border: `1px solid ${theme.palette.secondary["A50"]}`,
  }));

  return { RequiredFieldCss, RequiredSwitchCss, GlobalPaperCss };
}

export default useAppCss;
