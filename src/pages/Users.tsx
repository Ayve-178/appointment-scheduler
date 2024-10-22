/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import {
  getAllUsers,
  getUsernameByUid,
  searchUsers,
} from "../config/firestoreConfig";
import { User } from "../types";
import UserCard from "../components/UserCard";
import SearchInput from "../components/SearchInput";
import CreateAppointmentModal from "../components/CreateAppointmentModal";

const Users: React.FC = () => {
  const { currentUser } = useAuth();
  // const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [schedulerName, setSchedulerName] = useState("");
  const [holderName, setHolderName] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAppointmentBook = async (holderUid: string) => {
    //@ts-ignore
    console.log('uuuuiiiiiddd', currentUser.uid, holderUid);
    setOpenModal(true);
    //@ts-ignore
    const sName = await getUsernameByUid(currentUser.uid);
    const hName = await getUsernameByUid(holderUid);
    console.log(sName, hName);
    setSchedulerName(sName || "unknown");
    setHolderName(hName || "unknown");
  };

  const fetchUsers = async () => {
    try {
      const allUsers: any = await getAllUsers();
      setUsers(allUsers);
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
    // if (!currentUser) {
    //   navigate("/login");
    // }
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
      />
    </div>
  );
};

export default Users;
