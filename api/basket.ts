import { apiInstance } from '@/api/api-instance';
import { BasketProduct } from '@/types/basket';

export const getBasketItems = async (basketId: string) => {
  return await apiInstance<BasketProduct[]>(`/basket/${basketId}`, {
    method: 'GET',
  });
};
