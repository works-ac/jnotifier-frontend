import React, { useCallback, useState } from "react";
import { postView } from "../../services/PublicService";
import { toast } from "react-toastify";
import { getToastNotification } from "../../helpers";

function usePostView() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePostView = useCallback(async function (details) {
    setIsLoading(true);

    try {
      await postView(details);
    } catch (error) {
      const message =
        error?.response?.data?.error?.message ??
        error?.response?.data?.message ??
        "Failed to update your public view";

      toast.error(message, getToastNotification());
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { handlePostView, isLoading };
}

export default usePostView;
