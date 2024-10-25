export type User = {
  uid: string;
  username: string;
};

export interface FormData {
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number | null;
}

export interface Appointment {
  schedulerName: string;
  holderName: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number | null;
  endTime: string;
  audioFileUrl: string;
  status: string;
  createdAt?: Date;
};
