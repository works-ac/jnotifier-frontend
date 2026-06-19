import { useCallback, useEffect, useState } from "react";
import { getMe } from "../services/AccountsService";
import useAppAlert from "./useAppAlert";
import { useDispatch } from "react-redux";
import { setUserAuthStatus } from "../redux/slices/AuthSlice";

function useAccounts() {
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState();
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();
  const dispatch = useDispatch();

  const checkUserAuthStatus = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      try {
        const response = await getMe();
        const message = response.data?.data?.message;

        setAuthStatus(message);
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsLoading(false);
      }
    },
    [authStatus],
  );

  useEffect(() => {
    checkUserAuthStatus();
  }, []);

  useEffect(() => {
    dispatch(setUserAuthStatus({ authStatus }));
  }, [authStatus]);

  return { alert, handleAlertOnClose, isLoading };
}

export default useAccounts;
