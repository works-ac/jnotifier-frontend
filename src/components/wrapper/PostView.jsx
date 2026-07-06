import React, { useEffect } from "react";
import usePostView from "../../hooks/wrapper/usePostView";
import CircluarProgressLoader from "../CircluarProgressLoader";
import PropTypes from "prop-types";

function PostView({ children }) {
  const { handlePostView, isLoading } = usePostView();

  useEffect(() => {
    handlePostView();
  }, []);

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
