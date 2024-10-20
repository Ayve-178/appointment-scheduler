import { Navbar, Button } from "flowbite-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
      <Navbar.Brand href="https://flowbite.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          Appointment Scheduler
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button className="!text-black" onClick={handleSignOut}>Sign out</Button>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default AppNavbar;
