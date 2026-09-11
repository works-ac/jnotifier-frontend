import { WhatsApp } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import React, { useMemo } from "react";
import AppToolTip from "./AppToolTip";

function WhatsAppPromotion() {
  const whatsappChannelUri = useMemo(
    () => import.meta.env.VITE_WHATSAPP_CHANNEL_LINK,
    [],
  );

  return (
    <Stack direction="row" sx={{ justifyContent: "flex-end", mb: 1 }}>
      <AppToolTip
        title="Join our growing WhatsApp channel to receive instant job alerts and updates."
        placement="right"
      >
        <Button
          startIcon={<WhatsApp fontSize="small" />}
          variant="outlined"
          color="success"
          size="small"
          sx={{ p: 1 }}
          href={whatsappChannelUri}
          target="_blank"
          referrerPolicy="no-referrer"
        >
          WhatsApp Channel
        </Button>
      </AppToolTip>
    </Stack>
  );
}

export default React.memo(WhatsAppPromotion);
