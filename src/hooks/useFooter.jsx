import { useCallback } from "react";
import { AppVariables } from "../app/AppVariables";

function useFooter() {
  const handleWhatsAppBtnClick = useCallback(function () {
    window.open(AppVariables.WHATSAPP_CHANNEL_LINK, "_blank", {
      noopener: true,
      noreferrer: true,
    });
  }, []);

  const handleTelegramBtnClick = useCallback(function () {
    window.open(AppVariables.TELEGRAM_CHANNEL_LINK, "_blank", {
      noopener: true,
      noreferrer: true,
    });
  }, []);

  const handleEmailBtnClick = useCallback(function () {
    const link = `mailto:${AppVariables.SUPPORT_EMAIL}`;

    window.open(link, "_blank", {
      noopener: true,
      noreferrer: true,
    });
  }, []);

  return {
    handleWhatsAppBtnClick,
    handleTelegramBtnClick,
    handleEmailBtnClick,
  };
}

export default useFooter;
