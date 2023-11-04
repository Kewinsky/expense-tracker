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
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 bg-dark px-3">
          <SidebarComponent />
        </div>
        <div className={`col px-4 layout ${theme}-theme`}>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
