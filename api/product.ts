import { apiInstance } from '@/api/api-instance';
import { ProductResponse } from '@/store/product';

export const getAllProducts = async (params = {}) => {
  const queryString = Object.entries(params)
    .filter(([_, value]) => value != null)
    .reduce((params, [key, value]) => {
      params.append(key, value!.toString());
      return params;
    }, new URLSearchParams());

  return await apiInstance<ProductResponse>(
    `product?${queryString.toString()}`,
    {
      method: 'GET',
    },
  );
};
