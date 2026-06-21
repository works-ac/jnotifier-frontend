import { useCallback, useState } from "react";
import { resendOTP, verifyOTP } from "../services/SignupService";
import { useNavigate } from "react-router-dom";
import { AppConstants } from "../app/AppConstants";
function useOTPVerification() {
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleResendOTP = useCallback(async function (payload) {
    try {
      await resendOTP(payload);
    } catch {}
  }, []);

  const handleVerifyOTP = useCallback(async function (payload) {
    setIsVerifying(true);

    try {
      await verifyOTP(payload);

      if (
        payload.verificationType === AppConstants.OTP_VERIFICATION_TYPE.LOGIN
      ) {
        globalThis.location.reload();
        return;
      }

      await navigate("/account");
    } catch {
    } finally {
      setIsVerifying(false);
    }
  }, []);

  return { handleResendOTP, handleVerifyOTP, isVerifying };
}

export default useOTPVerification;
