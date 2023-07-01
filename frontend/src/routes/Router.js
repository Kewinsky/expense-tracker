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
import UpdateExpensePage from "../pages/updatePage/UpdateExpensePage";
import UpdateUserPage from "../pages/updatePage/UpdateUserPage";
import UpdateAdminPage from "../pages/updatePage/UpdateAdminPage";
import ForgotPasswordPage from "../pages/forgotPasswordPage/ForgotPasswordPage";

export const Router = ({
  expenses,
  setExpenses,
  currentUser,
  setCurrentUser,
  expenseCategories,
  months,
  years,
}) => {
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
          <MainLayout pageTitle={`${appName} | Reset password`}>
            <ForgotPasswordPage />
          </MainLayout>
        }
      />
      <Route
        path="/tracker"
        element={
          <MainLayout pageTitle={`${appName} | Tracker`}>
            <ProtectedRoute>
              <TrackerPage
                expenses={expenses}
                setExpenses={setExpenses}
                currentUser={currentUser}
                expenseCategories={expenseCategories}
                months={months}
                years={years}
              />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/analyzer"
        element={
          <MainLayout pageTitle={`${appName} | Analyzer`}>
            <ProtectedRoute>
              <AnalyzerPage expenses={expenses} months={months} years={years} />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/update/expense/:id"
        element={
          <MainLayout pageTitle={`${appName} | Update expense`}>
            <ProtectedRoute>
              <UpdateExpensePage
                expenses={expenses}
                setExpenses={setExpenses}
                expenseCategories={expenseCategories}
              />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/update/user/:id"
        element={
          <MainLayout pageTitle={`${appName} | Update user`}>
            <ProtectedRoute>
              <UpdateUserPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/update/userByAdmin/:id"
        element={
          <MainLayout pageTitle={"Spendee | Update User"}>
            <ProtectedRoute>
              <UpdateAdminPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/usermanagement"
        element={
          <MainLayout pageTitle={`${appName} | User management`}>
            <ProtectedRoute>
              <UserManagementPage currentUser={currentUser} />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout pageTitle={`${appName} | Profile`}>
            <ProtectedRoute>
              <ProfilePage currentUser={currentUser} />
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
