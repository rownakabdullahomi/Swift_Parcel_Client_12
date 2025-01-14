import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";

const MainLayout = () => {
  return (
    <div>
      <nav className="backdrop-blur-md backdrop-saturate-150 bg-white/30 shadow-md sticky top-0 z-50">
        <Navbar></Navbar>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </div>
  );
};

export default MainLayout;
