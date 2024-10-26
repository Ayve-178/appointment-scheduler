import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NotFound: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  return (
    <div className="flex flex-col pt-[150px]">
      <div className="text-xl font-bold text-center">Page Not Found</div>
      <Link to="/" className="text-xl font-bold text-center underline">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
