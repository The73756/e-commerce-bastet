export type Favorite = {
  id: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FavoriteProduct = {
  id: number;
  favoriteId: number;
  productId: number;
  createdAt?: Date;
  updatedAt?: Date;
};
