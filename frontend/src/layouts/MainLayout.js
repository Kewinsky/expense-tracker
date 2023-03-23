import { useEffect } from "react";
import Navbar from "../components/navbarComponent/NavbarComponent";

const MainLayout = ({ children, pageTitle }) => {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
