import React from "react";
import { Card } from "flowbite-react";
import { User } from "../types";

interface UserCardProps {
  user: User;
  handleAppointmentBook: any;
}

const UserCard: React.FC<UserCardProps> = ({ user, handleAppointmentBook }) => {
  return (
    <Card className="w-[280px] p-2.5">
      <div className="flex flex-row justify-between content-center">
        <img
          src="/assets/images/images.png"
          alt="user image"
          className="w-12 h-12 rounded-full"
        />
        <div className="space-y-1">
          <p className="text-normal font-semibold">{user.username}</p>
          <p
            className="cursor-pointer text-sm underline hover:text-gray-600 hover:decoration-gray-600"
            onClick={() => handleAppointmentBook(user.uid)}
          >
            Book Appointment
          </p>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
