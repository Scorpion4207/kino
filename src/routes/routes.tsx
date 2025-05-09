import { Route, Routes } from "react-router";
import { MainPage } from "../components/body/main-page";
import { MovieInfo } from "../components/body/movie/movie-info/movie-info";
import { PopUp } from "../components/pop-up/pop-up";

export const AppRouts = () => {
  const navigationRoutes = [
    { path: "/", element: <MainPage /> },
    { path: "/film/:idMovie", element: <MovieInfo /> },
    { path: "/login", element: <PopUp /> },
  ];
  return (
    <Routes>
      {navigationRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
