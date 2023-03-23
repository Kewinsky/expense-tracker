import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import UpdatePage from "../pages/updatePage/UpdatePage";

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout pageTitle={"Home"}>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout pageTitle={"Login"}>
            <LoginPage />
          </MainLayout>
        }
      />
      <Route
        path="/update"
        element={
          <MainLayout pageTitle={"Update"}>
            <UpdatePage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default Router;
