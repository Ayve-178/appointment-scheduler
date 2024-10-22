export type User = {
  uid: string;
  username: string;
};

export interface Appointment {
  schedulerName: string;
  holderName: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  audioFileUrl: string;
  createdAt?: Date;
};
