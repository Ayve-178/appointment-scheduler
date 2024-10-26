/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getAllUsers,
  getUsernameByUid,
  searchUsers,
} from "../config/firestoreConfig";
import { User, FormData } from "../types";
import UserCard from "../components/UserCard";
import SearchInput from "../components/SearchInput";
import CreateAppointmentModal from "../components/CreateAppointmentModal";
import { createAppointment, uploadAudioFile } from "../config/firestoreConfig";
import ToastContainer from "../components/ToastContainer";
import { HiCheck, HiX } from "react-icons/hi";
import { Timestamp } from "firebase/firestore";

const Users: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [schedulerName, setSchedulerName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAppointmentBook = async (holderUid: string) => {
    setOpenModal(true);
    //@ts-ignore
    const sName = await getUsernameByUid(currentUser.uid);
    const hName = await getUsernameByUid(holderUid);
    console.log(sName, hName);
    setSchedulerName(sName || "unknown");
    setHolderName(hName || "unknown");
  };

  const calculateEndTime = (
    startTime: string,
    durationMinutes: number | null,
    date: Date
  ) => {
    const dateNew = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
    const startDateTimeString = `${dateNew}T${startTime}:00`; 
    const startDateTime = new Date(startDateTimeString);

    const endDateTime = new Date(startDateTime.getTime() + +(durationMinutes ?? 0) * 60000); 
    const endTime = Timestamp.fromDate(endDateTime);
    return endTime;
  };

  const handleAppointmentCreate = async (
    formData: FormData,
    audioFile = null
  ) => {
    try {
      let audioUrl;
      if (audioFile) {
        audioUrl = await uploadAudioFile(audioFile);
      }
      createAppointment({
        schedulerName: schedulerName,
        holderName: holderName,
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        endTime: calculateEndTime(
          formData.time,
          formData.duration,
          formData.date
        ),
        audioFileUrl: audioUrl || "",
        status: "pending",
      });

      console.log("Apppointmenttt Fooorm Dataaaa", formData);
    } catch (e: any) {
      console.log((e as Error).message);
      setErrMsg((e as Error).message);
    }
    handleCloseModal();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const fetchUsers = async () => {
    try {
      const allUsers: any = await getAllUsers();
      const filteredUsers = allUsers.filter(
        (user: User) => user.uid !== currentUser?.uid
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleSearch = async () => {
    console.log("HandleSearch is calling");
    if (searchVal) {
      const searchUsersList = await searchUsers(searchVal);
      //@ts-ignore
      setUsers(searchUsersList);
    } else {
      fetchUsers();
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    fetchUsers();
  }, [currentUser]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchVal]);

  return (
    <div className="p-6">
      <SearchInput
        value={searchVal}
        handleChange={handleChange}
        handleSearch={handleSearch}
      />
      {currentUser && (
        <div className="flex flex-wrap justify-center content-center gap-8 mt-5">
          {users &&
            users.length > 0 &&
            users.map((user: User) => (
              <UserCard
                user={user}
                handleAppointmentBook={handleAppointmentBook}
              />
            ))}
        </div>
      )}
      <CreateAppointmentModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        schedulerName={schedulerName}
        holderName={holderName}
        handleAppointmentCreate={handleAppointmentCreate}
      />
      {showToast && (
        <div className="fixed top-4 right-4 z-100">
          <ToastContainer
            status={errMsg ? "danger" : "success"}
            icon={
              errMsg ? (
                <HiX className="w-5 h-5" />
              ) : (
                <HiCheck className="h-5 w-5" />
              )
            }
            message={
              errMsg
                ? "Something went wrong. Please try again!"
                : "Appointment Created Successfully!"
            }
          />
        </div>
      )}
    </div>
  );
};

export default Users;
