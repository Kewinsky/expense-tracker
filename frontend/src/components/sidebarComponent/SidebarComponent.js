import { useEffect, useState } from "react";
import AuthService from "../../services/authService";
import "./sidebarComponent.scss";
import logo from "../../assets/icons/logo.png";
import {
  BsTable,
  BsCart3,
  BsCashCoin,
  BsPieChart,
  BsFillPeopleFill,
  BsPersonCircle,
  BsBoxArrowUpRight,
} from "react-icons/bs";

const SidebarComponent = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      const roles = user.roles;

      if (roles.includes("ROLE_ADMIN")) {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <nav class="sidebar d-flex flex-column justify-content-between align-items-center align-items-sm-stretch text-white min-vh-100">
      <div>
        <a
          href="/"
          class="d-flex align-items-center text-white text-decoration-none"
        >
          <img
            src={logo}
            height="40"
            alt="Spendee Logo"
            class="mt-4 d-none d-sm-inline"
          />
        </a>
        <hr className="d-none d-sm-block" />
        <ul class="nav nav-pills flex-column">
          {currentUser ? (
            <>
              <li class="nav-item">
                <a
                  href="/analyzer"
                  class="nav-link text-white px-sm-3 pt-sm-3 p-3 pt-4"
                >
                  <div class="d-flex align-items-center flex-nowrap">
                    <BsTable />
                    <span class="ms-2 d-none d-sm-inline">Dashboard</span>
                  </div>
                </a>
              </li>
              <li class="nav-item">
                <a href="/tracker" class="nav-link text-white px-sm-3 p-3">
                  <div class="d-flex align-items-center flex-nowrap">
                    <BsCart3 />
                    <span class="ms-2 d-none d-sm-inline">Expenses</span>
                  </div>
                </a>
              </li>
              <li class="nav-item">
                <a href="/userIncomes" class="nav-link text-white px-sm-3 p-3">
                  <div class="d-flex align-items-center flex-nowrap">
                    <BsCashCoin />
                    <span class="ms-2 d-none d-sm-inline">Incomes</span>
                  </div>
                </a>
              </li>
              <li class="nav-item">
                <a
                  href="userCategories"
                  class="nav-link text-white px-sm-3 p-3"
                >
                  <div class="d-flex align-items-center flex-nowrap">
                    <BsPieChart />
                    <span class="ms-2 d-none d-sm-inline">Categories</span>
                  </div>
                </a>
              </li>
            </>
          ) : (
            <li class="nav-item">
              <a href="userCategories" class="nav-link text-white px-sm-3 p-3">
                <div class="d-flex align-items-center flex-nowrap">
                  <BsBoxArrowUpRight />
                  <span class="ms-2 d-none d-sm-inline">Login</span>
                </div>
              </a>
            </li>
          )}
          {isAdmin && (
            <li class="nav-item">
              <a href="/userManagement" class="nav-link text-white px-sm-3 p-3">
                <div class="d-flex align-items-center flex-nowrap">
                  <BsFillPeopleFill />
                  <span class="ms-2 d-none d-sm-inline">Users</span>
                </div>
              </a>
            </li>
          )}
        </ul>
      </div>
      {currentUser && (
        <div class="dropdown mb-4">
          <hr className="d-none d-sm-block" />
          <a
            href="/"
            class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <BsPersonCircle />
            <span class="ms-2 d-none d-sm-inline">
              {currentUser.username}'s Profile
            </span>
          </a>
          <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a class="dropdown-item" href="/profile">
                Profile
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/settings">
                Settings
              </a>
            </li>

            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button w-100">
                <a class="dropdown-item" href="/login">
                  Sign out
                </a>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default SidebarComponent;
