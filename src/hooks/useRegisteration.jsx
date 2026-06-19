import { useCallback, useState } from "react";
import { UserRegisteration } from "../data/UserRegisteration";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { UserRegisterSchema } from "../data/schema/UserRegisterationSchema";
import useAppAlert from "./useAppAlert";
import { register } from "../services/SignupService";
import useCaptcha from "./useCaptcha";

function useRegisteration() {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [textfieldType, setTextfieldType] = useState("password");
  const [userRegPayload, setUserRegPayload] = useState(UserRegisteration);
  const [dob, setDob] = useState(dayjs());
  const { captchaId } = useSelector((state) => state.captcha);
  const { alert, handleAlertOnClose, reset, setAlert, showErrorMsg } =
    useAppAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { reloadCaptcha } = useCaptcha();

  const togglePwdVisibility = useCallback(
    function () {
      setIsPwdVisible((prev) => !prev);
      setTextfieldType((prev) => (prev === "password" ? "text" : "password"));
    },
    [isPwdVisible, textfieldType],
  );

  const handleTextBoxOnChange = useCallback(function (e) {
    const { name, value, checked, type } = e.target || {};

    if (!name) return;

    const finalValue = type === "checkbox" ? checked : value;

    setUserRegPayload((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  }, []);

  const handleDobOnChange = useCallback(
    function (newValue) {
      setDob(newValue);
    },
    [dob],
  );

  const handleFormSubmit = useCallback(
    async function (e) {
      e.preventDefault();
      reset();

      const result = UserRegisterSchema.safeParse({
        ...userRegPayload,
        dob: dayjs(dob).format("YYYY/MM/DD"),
      });

      if (!result.success) {
        const message =
          result.error.message || "Please fill-up the form correctly";

        setAlert((prev) => ({ ...prev, message, type: "error", isOpen: true }));
        return;
      }

      const payload = {
        ...userRegPayload,
        captchaId,
        dob: dayjs(dob).format("YYYY-MM-DD"),
        mobile: userRegPayload.phone,
      };

      delete payload.phone;
      setIsSubmitting(true);

      try {
        await register(payload);
        setAlert((prev) => ({
          ...prev,
          isOpen: true,
          message: "Account created successfully",
          type: "success",
        }));

        await reloadCaptcha();
        setUserRegPayload(UserRegisteration);
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [userRegPayload],
  );

  return {
    isPwdVisible,
    userRegPayload,
    textfieldType,
    dob,
    alert,
    isSubmitting,
    handleAlertOnClose,
    togglePwdVisibility,
    handleTextBoxOnChange,
    handleDobOnChange,
    handleFormSubmit,
  };
}

export default useRegisteration;
