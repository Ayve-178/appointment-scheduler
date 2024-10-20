import { useLocation } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import AppRoutes from "./routes";

const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {!location.pathname.includes("/login") &&
        !location.pathname.includes("/registration") && <AppNavbar />}
      <div className="min-h-screen bg-gray-100">
        <AppRoutes />
      </div>
    </>
  );
};

export default Layout;
