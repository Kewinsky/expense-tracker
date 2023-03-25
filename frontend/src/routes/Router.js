import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AnalyzerPage from "../pages/analyzerPage/AnalyzerPage";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import TrackerPage from "../pages/trackerPage/TrackerPage";
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
        path="/register"
        element={
          <MainLayout pageTitle={"Register"}>
            <RegisterPage />
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
        path="/tracker"
        element={
          <MainLayout pageTitle={"Tracker"}>
            <TrackerPage />
          </MainLayout>
        }
      />
      <Route
        path="/analyzer"
        element={
          <MainLayout pageTitle={"Analyzer"}>
            <AnalyzerPage />
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
