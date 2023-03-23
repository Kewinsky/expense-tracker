import { useEffect } from "react";
import NavbarComponent from "../components/navbarComponent/NavbarComponent";

const MainLayout = ({ children, pageTitle }) => {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <>
      <NavbarComponent />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
