'use client';
import { getCookie } from '@/lib/cookie';
import { jwtDecode } from 'jwt-decode';
import { getBasketItems, getFavoriteItems } from '@/api/basket';
import { useFavoriteStore } from '@/store/favorite';
import { useEffect } from 'react';
import { useBasketStore } from '@/store/basket';

export const GetFavoriteAndBasket = () => {
  const setFavoriteItems = useFavoriteStore((state) => state.setFavoriteItems);
  const setCurrentFavoriteId = useFavoriteStore(
    (state) => state.setCurrentFavoriteId,
  );
  const setBasketItems = useBasketStore((state) => state.setBasketItems);
  const setCurrentBasketId = useBasketStore(
    (state) => state.setCurrentBasketId,
  );

  useEffect(() => {
    const getData = async () => {
      const token = await getCookie('token');
      if (token) {
        const decodedToken = jwtDecode(token?.value);
        const favResponse = await getFavoriteItems(decodedToken?.id);
        if (favResponse?.data) setFavoriteItems(favResponse?.data);

        const basketResponse = await getBasketItems(decodedToken?.id);
        if (basketResponse?.data) setBasketItems(basketResponse?.data);

        setCurrentFavoriteId(decodedToken?.id);
        setCurrentBasketId(decodedToken?.id);
      }
    };

    getData();
  }, []);

  return <></>;
};
