import { apiInstance } from '@/api/api-instance';
import { TypeSchema } from '@/store/catalog';

export interface CatalogTypesResponse {
  rows: TypeSchema[];
  count: number;
}

export const getCatalogTypes = async () => {
  return await apiInstance<CatalogTypesResponse>('/type', {
    method: 'GET',
  });
};
