import { Product } from '@/types/product';

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
  orderType: OrderType;
  orderStatus: OrderStatus;
  status: string;
  price: number;
  street: string;
  house: string;
  appartament: string;
  intercom: boolean;
  phone: string;
  comment: string;
  products: OrderProduct[];
  date: Date;
  time: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OrderProduct = {
  id: number;
  orderId: number;
  productId: number;
  count: number;
  product: Product;
  createdAt?: Date;
  updatedAt?: Date;
};
