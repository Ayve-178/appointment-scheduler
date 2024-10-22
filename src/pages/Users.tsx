/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { getAllUsers } from "../config/firestoreConfig";
import { User } from "../types";

const Users: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const allUsers: any = await getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    fetchUsers();
  }, [currentUser, navigate]);

  return (
    <>
      {currentUser && (
        <div>
          {users &&
            users.length > 0 &&
            users.map((user: User) => (
              <>
                <div>{user.username}</div>
                <div>{user.uid}</div>
                <Link to="/createAppointment" state={{ uid: user.uid }}>
                  Book
                </Link>
              </>
            ))}
        </div>
      )}
    </>
  );
};

export default Users;
