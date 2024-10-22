export type User = {
  uid: string;
  username: string;
};

export interface Appointment {
  schedulerUid: string;
  holderUid: string;
  title: string;
  description: string;
  date: string;
  time: string;
  audioFileUrl: string;
  createdAt?: Date;
};
