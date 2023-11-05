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
    <nav className="sidebar d-flex flex-column justify-content-between align-items-center align-items-sm-stretch text-white min-vh-100">
      <div>
        <a
          href="/"
          className="d-flex align-items-center text-white text-decoration-none"
        >
          <img
            src={logo}
            height="40"
            alt="Spendee Logo"
            className="mt-4 d-none d-sm-inline"
          />
        </a>
        <hr className="d-none d-sm-block" />
        <ul className="nav nav-pills flex-column">
          {currentUser ? (
            <>
              <li className="nav-item">
                <a
                  href="/analyzer"
                  className="nav-link text-white px-sm-3 pt-sm-3 p-3 pt-4"
                >
                  <div className="d-flex align-items-center flex-nowrap">
                    <BsTable />
                    <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a href="/tracker" className="nav-link text-white px-sm-3 p-3">
                  <div className="d-flex align-items-center flex-nowrap">
                    <BsCart3 />
                    <span className="ms-2 d-none d-sm-inline">Expenses</span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/userIncomes"
                  className="nav-link text-white px-sm-3 p-3"
                >
                  <div className="d-flex align-items-center flex-nowrap">
                    <BsCashCoin />
                    <span className="ms-2 d-none d-sm-inline">Incomes</span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="userCategories"
                  className="nav-link text-white px-sm-3 p-3"
                >
                  <div className="d-flex align-items-center flex-nowrap">
                    <BsPieChart />
                    <span className="ms-2 d-none d-sm-inline">Categories</span>
                  </div>
                </a>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <a
                href="userCategories"
                className="nav-link text-white px-sm-3 p-3"
              >
                <div className="d-flex align-items-center flex-nowrap">
                  <BsBoxArrowUpRight />
                  <span className="ms-2 d-none d-sm-inline">Login</span>
                </div>
              </a>
            </li>
          )}
          {isAdmin && (
            <li className="nav-item">
              <a
                href="/userManagement"
                className="nav-link text-white px-sm-3 p-3"
              >
                <div className="d-flex align-items-center flex-nowrap">
                  <BsFillPeopleFill />
                  <span className="ms-2 d-none d-sm-inline">Users</span>
                </div>
              </a>
            </li>
          )}
        </ul>
      </div>
      {currentUser && (
        <div className="dropdown mb-4">
          <hr className="d-none d-sm-block" />
          <a
            href="/"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <BsPersonCircle />
            <span className="ms-2 d-none d-sm-inline">
              {currentUser.username}'s Profile
            </span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="/profile">
                Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/settings">
                Settings
              </a>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button w-100">
                <a className="dropdown-item" href="/login">
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