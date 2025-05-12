export type User = {
  id: number;
  surname: string;
  name: string;
  phone: string;
  email: string;
  password?: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
};
