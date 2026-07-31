import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import usePostView from "../../hooks/wrapper/usePostView";
import CircluarProgressLoader from "../CircluarProgressLoader";
import PropTypes from "prop-types";
import { UAParser } from "ua-parser-js";

function PostView({ children }) {
  const { handlePostView, isLoading } = usePostView();
  const location = useLocation();
  const clientInfo = useMemo(() => new UAParser().getResult(), []);
  const visitedPage = globalThis.location.origin + location.pathname;
  const browserName = clientInfo.browser.name;
  const browserVersion = clientInfo.browser.version;
  const osName = clientInfo.os.name;
  const deviceType = clientInfo.device.type;
  const deviceVendor = clientInfo.device.vendor;

  useEffect(() => {
    handlePostView({
      visitedPage,
      browserName,
      browserVersion,
      osName,
      deviceType,
      deviceVendor,
    });
  }, [location.pathname]);

  if (isLoading)
    return (
      <CircluarProgressLoader text="Please wait, we're loading your page" />
    );

  return children;
}

PostView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(PostView);
