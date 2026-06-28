import React, { useCallback, useState } from "react";
import useAppAlert from "./useAppAlert";
import { getMe } from "../services/AccountsService";
import { useDispatch } from "react-redux";
import { setUserAuthStatus } from "../redux/slices/AuthSlice";

function useAuthStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const dispatch = useDispatch();

  const checkUserAuthStatus = useCallback(async function () {
    setIsLoading(true);
    reset();

    try {
      const response = await getMe();
      const message = response.data?.data?.message;

      dispatch(setUserAuthStatus({ authStatus: message }));
    } catch (error) {
      showErrorMsg(error);
      dispatch(setUserAuthStatus({ authStatus: null }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { checkUserAuthStatus, isLoading, alert, handleAlertOnClose };
}

export default useAuthStatus;
