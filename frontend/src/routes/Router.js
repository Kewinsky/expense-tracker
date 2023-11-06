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
import UserManagementPage from "../pages/userManagementPage/UserManagementPage";
import ProtectedRoute from "./ProtectedRoute";
import UpdateExpensePage from "../pages/updatePages/UpdateExpensePage";
import UpdateUserPage from "../pages/updatePages/UpdateUserPage";
import UpdateAdminPage from "../pages/updatePages/UpdateAdminPage";
import ForgotPasswordPage from "../pages/forgotPasswordPage/ForgotPasswordPage";
import UpdateCategoryPage from "../pages/updatePages/UpdateCategoryPage";
import UserCategoriesPage from "../pages/userCategoriesPage/UserCategoriesPage";
import IncomePage from "../pages/incomePage/IncomePage";
import SettingsPage from "../pages/settingsPage/SettingsPage";
import UpdateIncomePage from "../pages/updatePages/UpdateIncomePage";

export const Router = () => {
  const appName = "Spendee";

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout pageTitle={`${appName} | Home`}>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout pageTitle={`${appName} | Register`}>
            <RegisterPage />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout pageTitle={`${appName} | Login`}>
            <LoginPage />
          </MainLayout>
        }
      />
      <Route
        path="/forgotPassword"
        element={
          <MainLayout pageTitle={`${appName} | Reset Password`}>
            <ForgotPasswordPage />
          </MainLayout>
        }
      />
      <Route
        path="/tracker"
        element={
          <MainLayout pageTitle={`${appName} | Tracker`}>
            <ProtectedRoute>
              <TrackerPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/analyzer"
        element={
          <MainLayout pageTitle={`${appName} | Analyzer`}>
            <ProtectedRoute>
              <AnalyzerPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/update/expense/:id"
        element={
          <MainLayout pageTitle={`${appName} | Update Expense`}>
            <ProtectedRoute>
              <UpdateExpensePage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/update/user/:id"
        element={
          <MainLayout pageTitle={`${appName} | Update User`}>
            <ProtectedRoute>
              <UpdateUserPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/update/userByAdmin/:id"
        element={
          <MainLayout pageTitle={`${appName} | Update User`}>
            <ProtectedRoute>
              <UpdateAdminPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/update/category/:id"
        element={
          <MainLayout pageTitle={`${appName} | Update Category`}>
            <ProtectedRoute>
              <UpdateCategoryPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/update/income/:id"
        element={
          <MainLayout pageTitle={`${appName} | Update Category`}>
            <ProtectedRoute>
              <UpdateIncomePage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/userManagement"
        element={
          <MainLayout pageTitle={`${appName} | User Management`}>
            <ProtectedRoute>
              <UserManagementPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout pageTitle={`${appName} | Profile`}>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/userCategories"
        element={
          <MainLayout pageTitle={`${appName} | User Categories`}>
            <ProtectedRoute>
              <UserCategoriesPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/userIncomes"
        element={
          <MainLayout pageTitle={`${appName} | User Incomes`}>
            <ProtectedRoute>
              <IncomePage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <MainLayout pageTitle={`${appName} | Settings`}>
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/unauthorized"
        element={
          <MainLayout pageTitle={"Unauthorized"}>
            <ProtectedRoute>
              <UnauthorizedPage />
            </ProtectedRoute>
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
