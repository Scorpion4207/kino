import { TextField } from "@mui/material";

interface InputForPopUpProps {
  label: string;
  valueInput: string;
  setValueInput: React.Dispatch<React.SetStateAction<string>>;
}

export const InputForPopUp = ({ label, valueInput, setValueInput }: InputForPopUpProps) => {
  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValueInput(event.target.value);
  };

  return (
    <TextField
      color="success"
      sx={{ width: "400px" }}
      variant="standard"
      label={label}
      value={valueInput}
      onChange={handleChangeInputValue}
    />
  );
};
