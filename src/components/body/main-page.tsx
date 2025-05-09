import { Box } from "@mui/material";
import { AsideFilters } from "./filters/aside-filters";
import { MovieList } from "./movie/movie-list";
import { useUserDataSelectors } from "../../hooks/user-data/use-selectors";

export const MainPage = () => {
  const { idAccount, token } = useUserDataSelectors();

  if (!idAccount || !token) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        Приветсвую, для начало авторизуйтесь
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "15px",
      }}
    >
      <AsideFilters />
      <main className="main">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            maxHeight: "85vh",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <MovieList />
        </Box>
      </main>
    </Box>
  );
};
