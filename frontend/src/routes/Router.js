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
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout pageTitle={"Spendee | Home"}>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout pageTitle={"Spendee | Register"}>
            <RegisterPage />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout pageTitle={"Spendee | Login"}>
            <LoginPage />
          </MainLayout>
        }
      />
      <Route
        path="/forgotPassword"
        element={
          <MainLayout pageTitle={"Spendee | Forgot Password"}>
            <ForgotPasswordPage />
          </MainLayout>
        }
      />
      <Route
        path="/tracker"
        element={
          <MainLayout pageTitle={"Spendee | Tracker"}>
            <ProtectedRoute currentUser={currentUser}>
              <TrackerPage
                expenses={expenses}
                setExpenses={setExpenses}
                currentUser={currentUser}
                expenseCategories={expenseCategories}
                months={months}
              />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/analyzer"
        element={
          <MainLayout pageTitle={"Spendee | Analyzer"}>
            <ProtectedRoute currentUser={currentUser}>
              <AnalyzerPage expenses={expenses} months={months} />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/update/expense/:id"
        element={
          <MainLayout pageTitle={"Spendee | Update Expense"}>
            <ProtectedRoute currentUser={currentUser}>
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
          <MainLayout pageTitle={"Spendee | Update User"}>
            <ProtectedRoute currentUser={currentUser}>
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
            <ProtectedRoute currentUser={currentUser}>
              <UpdateAdminPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/usermanagement"
        element={
          <MainLayout pageTitle={"Spendee | User Management"}>
            <ProtectedRoute currentUser={currentUser}>
              <UserManagementPage currentUser={currentUser} />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout pageTitle={"Spendee | Profile"}>
            <ProtectedRoute currentUser={currentUser}>
              <ProfilePage currentUser={currentUser} />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/unauthorized"
        element={
          <MainLayout pageTitle={"Unauthorized"}>
            <ProtectedRoute currentUser={currentUser}>
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
