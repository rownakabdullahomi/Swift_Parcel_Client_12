import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <nav className="w-full fixed backdrop-blur-md backdrop-saturate-150 bg-white/30 text-white shadow-md top-0 z-50">
        <Navbar></Navbar>
      </nav>

      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
