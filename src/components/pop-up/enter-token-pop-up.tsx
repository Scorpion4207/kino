import { Box, Button, Stack } from "@mui/material";
import { InputForPopUp } from "./input-for-pop-up";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUserDataSelectors } from "../../hooks/user-data/use-selectors";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchAuthAccountAction } from "../../store/user/middleware/auth-account-middleware";
import { CircularProgress } from "@mui/material";

interface EnterTokenPopUpProps {
  setIsTokenSentToEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EnterTokenPopUp = ({ setIsTokenSentToEmail }: EnterTokenPopUpProps) => {
  const [valueInput, setValueInput] = useState("");
  const { loading, error } = useUserDataSelectors();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading === "succeeded") navigate("/");
  }, [loading]);

  const handleClick = () => {
    setIsTokenSentToEmail(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchAuthAccountAction({ token: valueInput }));
    setValueInput("");
  };

  return (
    <Box
      sx={{
        padding: "8px 15px",
        borderRadius: "15px",
        border: "2px solid black",
      }}
    >
      <h2 className="title__popUp">Введите токен</h2>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <InputForPopUp label="Токен" valueInput={valueInput} setValueInput={setValueInput} />
          <Stack spacing={0} direction="row" sx={{ marginTop: "30px" }}>
            {loading === "pending" && <CircularProgress />}
            {error && error}
            <Button onClick={handleClick} color="error" variant="text">
              ОТМЕНА
            </Button>
            <Button color="success" variant="text" type="submit">
              OK
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};
