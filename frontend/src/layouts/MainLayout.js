import { useEffect } from "react";
import SidebarComponent from "../components/sidebarComponent/SidebarComponent";

const MainLayout = ({ children, pageTitle }) => {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 bg-dark px-3">
          <SidebarComponent />
        </div>
        <div className="col px-4">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
