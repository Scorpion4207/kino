import { Box } from "@mui/material";
import { useState } from "react";
import { SendTokenPopUp } from "./send-token-pop-up";
import { EnterTokenPopUp } from "./enter-token-pop-up";

export const PopUp = () => {
  const [isTokenSentToEmail, setIsTokenSentToEmail] = useState(false);

  const modalPopUp = () =>
    !isTokenSentToEmail ? (
      <SendTokenPopUp setIsTokenSentToEmail={setIsTokenSentToEmail} />
    ) : (
      <EnterTokenPopUp setIsTokenSentToEmail={setIsTokenSentToEmail} />
    );

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {modalPopUp()}
    </Box>
  );
};
