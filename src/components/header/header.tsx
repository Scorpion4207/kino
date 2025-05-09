import { Box, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();
  const handleClick = (to: string) => {
    navigate(to);
  };

  return (
    <>
      <header className="header">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 24px",
            borderRadius: "0 0 20px 20px",
            backgroundColor: "#1E90FF",
            marginBottom: "10px",
          }}
        >
          <p className="logo__title">Фильмы</p>
          <IconButton
            onClick={() => {
              handleClick("/login");
            }}
            aria-label="account"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </header>
    </>
  );
};
