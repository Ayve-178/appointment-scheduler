import { Timestamp } from "firebase/firestore";

export type User = {
  uid: string;
  username: string;
};

export interface FormData {
  title: string;
  description: string;
  date: Date;
  time: string;
  duration: number | null;
}

export interface Appointment {
  schedulerName: string;
  holderName: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  duration: number | null;
  endTime: Timestamp;
  audioFileUrl: string;
  status: string;
  createdAt?: Date;
};
