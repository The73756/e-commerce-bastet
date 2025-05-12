import { Product } from '@/types/product';

export type Basket = {
  id: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type BasketProduct = {
  id: number;
  basketId: number;
  productId: number;
  count: number;
  createdAt?: Date;
  updatedAt?: Date;

  product: Product;
};
