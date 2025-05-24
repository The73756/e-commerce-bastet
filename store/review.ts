import { create } from 'zustand';
import { apiInstance, ApiReturn } from '@/api/api-instance';
import { Rating } from '@/types/product';

interface ReviewStore {
  reviews: Rating[] | null;
  isLoading: boolean;
  error: string | null;

  getAllReviewsOfUser: (userId: number) => Promise<ApiReturn<Rating[]>>;
  createReview: (reviewData: {
    userId: number;
    productId: number;
    rate: number;
    comment: string;
  }) => Promise<ApiReturn<{ newRating: Rating; message: string }>>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useReviewStore = create<ReviewStore>()((set) => ({
  reviews: null,
  isLoading: true,
  error: null,

  getAllReviewsOfUser: async (userId) => {
    set({ isLoading: true, error: null });

    const { success, data, error } = await apiInstance<Rating[]>(
      `/rating/${userId}`,
      {
        method: 'GET',
      },
    );

    if (success && data) {
      set({
        reviews: data,
        isLoading: false,
      });
      return { success, data, error };
    }

    set({ error: error?.message, isLoading: false });
    return { success, data, error };
  },

  createReview: async (reviewData) => {
    set({ isLoading: true, error: null });

    const { success, data, error } = await apiInstance<{
      newRating: Rating;
      message: string;
    }>('/rating', {
      method: 'POST',
      body: reviewData,
    });

    if (success && data) {
      set((state) => ({
        reviews: [...(state.reviews || []), data.newRating],
        isLoading: false,
      }));

      return { success, data, error };
    }

    set({ error: error?.message, isLoading: false });
    return { success, data, error };
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
