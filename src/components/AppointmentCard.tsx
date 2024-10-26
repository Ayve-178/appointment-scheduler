import React, { ReactNode } from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

interface AppointmentCardProps {
  icon: ReactNode;
  appointmentType: string;
  description: string;
  buttonText: string;
  category: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  icon,
  appointmentType,
  description,
  buttonText,
  category,
}) => {
  return (
    <Card className="w-[300px] text-center">
      <h5 className="text-3xl flex justify-center font-bold tracking-tight text-gray-900">
        {icon}
      </h5>
      <p className="font-semibold text-lg text-gray-700">{appointmentType}</p>
      <p className="font-normal text-[12px] text-gray-700">{description}</p>
      <Link
        to={{
          pathname: "/appointments",
        }}
        state={{ category }}
        className="text-[13px] underline"
      >
        {buttonText}
      </Link>
    </Card>
  );
};

export default AppointmentCard;
