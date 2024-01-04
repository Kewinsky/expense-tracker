import { useContext, useEffect } from "react";
import SidebarComponent from "../components/sidebarComponent/SidebarComponent";
import { ThemeContext } from "../App";
import "./mainLayout.scss";

const MainLayout = ({ children, pageTitle }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <>
      <SidebarComponent />
      <main
        className={`d-flex flex-column px-3 layout ${theme}-theme min-vh-100`}
      >
        {children}
      </main>
    </>
  );
};

export default MainLayout;
