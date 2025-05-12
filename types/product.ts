import { User } from '@/types/user';

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  rating: number;
  description: string;
  typeId: number;
  brandId: number;
  tagId: number;
  createdAt?: Date;
  updatedAt?: Date;

  tag: TypeBrandTag;
  brand: TypeBrandTag;
  type: TypeBrandTag;
  photos: ProductPhoto[];
};

export type TypeBrandTag = {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Rating = {
  id: number;
  userId: number;
  rate: number;
  comment: string;
  productId: number;
  createdAt?: Date;
  updatedAt?: Date;

  user: User;
};

export type ProductInfo = {
  id: number;
  title: string;
  description: string;
  productId: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductPhoto = {
  id: number;
  url: string;
  productId: number;
  createdAt?: Date;
  updatedAt?: Date;
};
