import { apiInstance } from '@/api/api-instance';
import { BasketProduct } from '@/types/basket';
import { FavoriteProduct } from '@/types/favorite';

export const getBasketItems = async (basketId: string) => {
  return await apiInstance<BasketProduct[]>(`/basket/${basketId}`, {
    method: 'GET',
  });
};

export const getFavoriteItems = async (favoriteId: string) => {
  return await apiInstance<FavoriteProduct[]>(`/favorite/${favoriteId}`, {
    method: 'GET',
  });
};
