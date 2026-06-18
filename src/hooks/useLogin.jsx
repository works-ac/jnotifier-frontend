import { useCallback, useState } from "react";

function useLogin() {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [textfieldType, setTextfieldType] = useState("password");

  const togglePwdVisibility = useCallback(
    function () {
      setIsPwdVisible((prev) => !prev);
      setTextfieldType((prev) => (prev === "password" ? "text" : "password"));
    },
    [isPwdVisible, textfieldType],
  );

  return { isPwdVisible, togglePwdVisibility, textfieldType };
}

export default useLogin;
