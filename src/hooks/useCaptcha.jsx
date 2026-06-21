import { useCallback, useEffect, useState } from "react";
import { getCaptcha } from "../services/SignupService";
import useAppAlert from "./useAppAlert";
import { useDispatch } from "react-redux";
import { setCaptcha } from "../redux/slices/CaptchaSlice";

function useCaptcha() {
  const [captchaUri, setCaptchaUri] = useState();
  const [captchaId, setCaptchaId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorMsg, reset, alert, handleAlertOnClose } = useAppAlert();
  const dispatch = useDispatch();

  const loadCaptcha = useCallback(async function () {
    reset();

    try {
      const response = await getCaptcha();
      const uri = response.data?.data?.captchaImage;

      setCaptchaUri(uri);
      setCaptchaId(response.data?.data?.captchaId);
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
        setCaptchaId(response.data?.data?.captchaId);
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

  useEffect(() => {
    dispatch(setCaptcha({ captchaId, captchaImage: captchaUri }));
  }, [captchaId, captchaUri]);

  return {
    isLoading,
    alert,
    handleAlertOnClose,
    reloadCaptcha,
  };
}

export default useCaptcha;
