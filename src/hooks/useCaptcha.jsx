import { useCallback, useEffect, useState } from "react";
import { getCaptcha } from "../services/SignupService";
import useAppAlert from "./useAppAlert";

function useCaptcha() {
  const [captchaUri, setCaptchaUri] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorMsg, reset, alert, handleAlertOnClose } = useAppAlert();

  const loadCaptcha = useCallback(async function () {
    reset();

    try {
      const response = await getCaptcha();
      const uri = response.data?.data?.captchaImage;

      setCaptchaUri(uri);
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reloadCaptcha = useCallback(
    async function () {
      reset();
      setIsLoading(true);

      try {
        const response = await getCaptcha();
        const uri = response.data?.data?.captchaImage;

        setCaptchaUri(uri);
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  useEffect(() => {
    setIsLoading(true);
    loadCaptcha();
  }, []);

  return { isLoading, captchaUri, alert, handleAlertOnClose, reloadCaptcha };
}

export default useCaptcha;
