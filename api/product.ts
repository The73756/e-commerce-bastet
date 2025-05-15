import { apiInstance } from '@/api/api-instance';
import {
  ProductGroup,
  ProductResponse,
  SingleProductResponse,
} from '@/store/product';

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

export const getOneProduct = async (id: string) => {
  return await apiInstance<SingleProductResponse>(`/product/${id}`, {
    method: 'GET',
  });
};

export const getProductGroups = async () => {
  return await apiInstance<ProductGroup[]>('/product/groups', {
    method: 'GET',
  });
};
