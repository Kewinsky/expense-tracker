import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/dashboardPage/DashboardPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import ExpensesPage from "../pages/expensesPage/ExpensesPage";
import UnauthorizedPage from "../pages/unauthorizedPage/UnauthorizedPage";
import UsersPage from "../pages/usersPage/UsersPage";
import ProtectedRoute from "./ProtectedRoute";
import UpdateExpensePage from "../pages/updatePages/UpdateExpensePage";
import UpdateProfilePage from "../pages/updatePages/UpdateProfilePage";
import UpdateUserPage from "../pages/updatePages/UpdateUserPage";
import ResetPasswordPage from "../pages/resetPasswordPage/ResetPasswordPage";
import UpdateCategoryPage from "../pages/updatePages/UpdateCategoryPage";
import IncomesPage from "../pages/incomesPage/IncomesPage";
import SettingsPage from "../pages/settingsPage/SettingsPage";
import UpdateIncomePage from "../pages/updatePages/UpdateIncomePage";
import CategoriesPage from "../pages/categoriesPage/CategoriesPage";

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
        path="/resetPassword"
        element={
          <MainLayout pageTitle={`${appName} | Reset Password`}>
            <ResetPasswordPage />
          </MainLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <MainLayout pageTitle={`${appName} | Dashboard`}>
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/expenses"
        element={
          <MainLayout pageTitle={`${appName} | Expenses`}>
            <ProtectedRoute>
              <ExpensesPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/incomes"
        element={
          <MainLayout pageTitle={`${appName} | Incomes`}>
            <ProtectedRoute>
              <IncomesPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/categories"
        element={
          <MainLayout pageTitle={`${appName} | Categories`}>
            <ProtectedRoute>
              <CategoriesPage />
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
        path="/update/income/:id"
        element={
          <MainLayout pageTitle={`${appName} | Update Income`}>
            <ProtectedRoute>
              <UpdateIncomePage />
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
        path="/update/profile/:id"
        element={
          <MainLayout pageTitle={`${appName} | Update Profile`}>
            <ProtectedRoute>
              <UpdateProfilePage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/users"
        element={
          <MainLayout pageTitle={`${appName} | Users`}>
            <ProtectedRoute>
              <UsersPage />
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
          <MainLayout pageTitle={"Not Found"}>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default Router;
