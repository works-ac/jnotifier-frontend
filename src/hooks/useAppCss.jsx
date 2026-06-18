import React, { useMemo } from "react";

function useAppCss() {
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

  return { RequiredFieldCss, RequiredSwitchCss };
}

export default useAppCss;
