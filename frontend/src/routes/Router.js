import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AnalyzerPage from "../pages/analyzerPage/AnalyzerPage";
import ErrorPage from "../pages/errorPage/ErrorPage";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import TrackerPage from "../pages/trackerPage/TrackerPage";
import UnauthorizedPage from "../pages/unauthorizedPage/UnauthorizedPage";
import UpdatePage from "../pages/updatePage/UpdatePage";
import UserManagementPage from "../pages/userManagementPage/UserManagementPage";

export const Router = ({
  expenses,
  setExpenses,
  currentUser,
  setCurrentUser,
}) => {
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
            <TrackerPage
              expenses={expenses}
              setExpenses={setExpenses}
              currentUser={currentUser}
            />
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
        path="/update/:id"
        element={
          <MainLayout pageTitle={"Update"}>
            <UpdatePage expenses={expenses} setExpenses={setExpenses} />
          </MainLayout>
        }
      />
      <Route
        path="/usermanagement"
        element={
          <MainLayout pageTitle={"User Management"}>
            <UserManagementPage />
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout pageTitle={"Profile Page"}>
            <ProfilePage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </MainLayout>
        }
      />
      <Route
        path="/unauthorized"
        element={
          <MainLayout pageTitle={"Unauthorized"}>
            <UnauthorizedPage currentUser={currentUser} />
          </MainLayout>
        }
      />
      <Route
        path="*"
        element={
          <MainLayout pageTitle={"Error"}>
            <ErrorPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default Router;
