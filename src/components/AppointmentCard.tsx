import React from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

interface AppointmentCardProps {
  count: number;
  appointmentType: string;
  description: string;
  buttonText: string;
  category: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  count,
  appointmentType,
  description,
  buttonText,
  category,
}) => {
  return (
    <Card className="w-[350px] text-center">
      <h5 className="text-3xl text-center font-bold tracking-tight text-gray-900">
        {count}
      </h5>
      <p className="font-semibold text-lg text-gray-700">{appointmentType}</p>
      <p className="font-normal text-[15px] text-gray-700">{description}</p>
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
