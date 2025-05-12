export type OrderType = {
  id: number;
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OrderStatus = {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Order = {
  id: number;
  userId: number;
  orderTypeId: number;
  orderStatusId: number;
  status: string;
  price: number;
  street: string;
  house: string;
  appartament: string;
  intercom: boolean;
  phone: string;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OrderProduct = {
  id: number;
  orderId: number;
  productId: number;
  count: number;
  createdAt?: Date;
  updatedAt?: Date;
};
