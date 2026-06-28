import React, { useEffect } from "react";
import useAuthStatus from "../hooks/useAuthStatus";
import PropTypes from "prop-types";
import CircluarProgressLoader from "./CircluarProgressLoader";
import AppAlert from "./AppAlert";

function CheckAuthStatus({ children }) {
  const { alert, checkUserAuthStatus, handleAlertOnClose, isLoading } =
    useAuthStatus();

  useEffect(() => {
    checkUserAuthStatus();
  }, []);

  if (isLoading)
    return <CircluarProgressLoader text="Please wait..." takeHeight />;

  return (
    <>
      <AppAlert
        alert={alert}
        handleAlertOnClose={handleAlertOnClose}
        type={alert?.type}
      />

      {children}
    </>
  );
}

CheckAuthStatus.propTypes = {
  children: PropTypes.node,
};

export default React.memo(CheckAuthStatus);
