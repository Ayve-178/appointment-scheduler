import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { useAuth } from "../contexts/AuthContext";
import { getAllUsers } from "../config/firestoreConfig";

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const getUsers = async () => {
    const users = await getAllUsers();
    console.log('users---------------', users);
  }

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      {" "}
      {currentUser && (
        <div className="flex items-center justify-evenly pt-[150px]">
          <AppointmentCard
            count={2}
            appointmentType="Past Sessions"
            description="A record of all the sessions that have been completed successfully."
            buttonText="View Sessions"
          />
          <AppointmentCard
            count={10}
            appointmentType="Scheduled Appointments"
            description="View the upcoming appointments that are already planned and scheduled."
            buttonText="View Appointments"
          />
          <AppointmentCard
            count={8}
            appointmentType="Invitations to Attend"
            description="The appointments where you've been invited as a participant."
            buttonText="View Invitations"
          />
        </div>
      )}
      <button onClick={getUsers}>Get users</button>
    </>
  );
};

export default Home;
