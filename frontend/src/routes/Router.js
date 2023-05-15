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

export const Router = ({
  expenses,
  setExpenses,
  currentUser,
  setCurrentUser,
  expenseCategories,
  months,
  theme,
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
            <RegisterPage theme={theme} />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout pageTitle={"Spendee | Login"}>
            <LoginPage theme={theme} />
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
                theme={theme}
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
              <AnalyzerPage expenses={expenses} months={months} theme={theme} />
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
                theme={theme}
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
                theme={theme}
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
              <UpdateAdminPage theme={theme} />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/usermanagement"
        element={
          <MainLayout pageTitle={"Spendee | User Management"}>
            <ProtectedRoute currentUser={currentUser}>
              <UserManagementPage currentUser={currentUser} theme={theme} />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout pageTitle={"Spendee | Profile"}>
            <ProtectedRoute currentUser={currentUser}>
              <ProfilePage currentUser={currentUser} theme={theme} />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/unauthorized"
        element={
          <MainLayout pageTitle={"Unauthorized"}>
            <ProtectedRoute currentUser={currentUser}>
              <UnauthorizedPage currentUser={currentUser} />
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
