import { Box, Button, Stack } from "@mui/material";
import { InputForPopUp } from "./input-for-pop-up";
import { useState } from "react";
import { useNavigate } from "react-router";

interface SendTokenPopUpProps {
  setIsTokenSentToEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SendTokenPopUp = ({ setIsTokenSentToEmail }: SendTokenPopUpProps) => {
  const [valueInput, setValueInput] = useState("");
  const navigate = useNavigate();

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_REGEXP.test(valueInput)) {
      return alert("Введенная почта некорректная");
    }
    setValueInput("");
    setIsTokenSentToEmail(true);
  };

  const handleClickCloseModal = () => {
    navigate("/kino/");
  };

  return (
    <Box
      sx={{
        padding: "8px 15px",
        borderRadius: "15px",
        border: "2px solid black",
      }}
    >
      <h2 className="title__popUp">Запросить токен</h2>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <InputForPopUp label="Почта" valueInput={valueInput} setValueInput={setValueInput} />
          <Stack spacing={0} direction="row" sx={{ marginTop: "30px" }}>
            <Button onClick={handleClickCloseModal} color="error" variant="text">
              ОТМЕНА
            </Button>
            <Button color="success" variant="text" type="submit">
              ЗАПРОСИТЬ
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};
