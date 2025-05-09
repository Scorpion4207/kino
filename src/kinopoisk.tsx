import { Box } from "@mui/material";
import { Header } from "./components/header/header";
import { AppRouts } from "./routes/routes";
import { BrowserRouter } from "react-router";

export const Kinopoisk = () => (
  <BrowserRouter basename="/kino">
    <Box>
      <Header />
      <AppRouts />
    </Box>
  </BrowserRouter>
);
