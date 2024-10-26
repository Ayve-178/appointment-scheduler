import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { useAuth } from "../contexts/AuthContext";
import {
  MdContentPasteOff,
  MdOutlineContentPasteGo,
  MdOutlineContentPasteSearch,
  MdOutlinePendingActions,
} from "react-icons/md";
// import { getAllUsers } from "../config/firestoreConfig";

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      console.log("coming...");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  console.log("curr", currentUser);

  return (
    <div className="p-2">
      <div className="flex items-center flex-wrap justify-evenly md:pt-[100px] pt-[60px] flex-col md:flex-row gap-y-6">
        <AppointmentCard
          icon={<MdContentPasteOff className="w-12 h-12" />}
          appointmentType="Past Sessions"
          description="A record of all the sessions that have been completed successfully."
          buttonText="View Sessions"
          category="past"
        />
        <AppointmentCard
          icon={<MdOutlinePendingActions className="w-12 h-12" />}
          appointmentType="Scheduled Appointments"
          description="View the upcoming appointments that are already scheduled."
          buttonText="View Appointments"
          category="scheduled"
        />
        <AppointmentCard
          icon={<MdOutlineContentPasteSearch className="w-12 h-12" />}
          appointmentType="Invitations Received"
          description="The appointments where you've been invited as a participant."
          buttonText="View Received Invitations"
          category="invite_received"
        />
        <AppointmentCard
          icon={<MdOutlineContentPasteGo className="w-12 h-12" />}
          appointmentType="Invitations Sent"
          description="The appointments where you've been invited as a participant."
          buttonText="View Sent Invitations"
          category="invite_sent"
        />
      </div>
      <Link
        to="/users"
        className="w-[200px] px-4 py-2 mt-12 bg-gray-800 text-white font-normal flex justify-center content-center mx-auto hover:bg-gray-900"
      >
        Find Users
      </Link>
    </div>
  );
};

export default Home;
