import { Navbar, Button } from "flowbite-react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function AppNavbar() {
  const {logout} = useAuth();
  const navigate= useNavigate();
  
  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      console.log(e);
      alert('Something went wrong! Please try again!');
    }
  }

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          Appointment Scheduler
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Link to="/users" className="content-center font-semibold">Users</Link>
        <Button className="!text-black" onClick={handleSignOut}>Sign out</Button>
      </div>
    </Navbar>
  );
}

export default AppNavbar;
