import 'dayjs/locale/ru';
import dayjs from 'dayjs';

dayjs.locale('ru');

export const formatDate = (date: Date | undefined) =>
  date ? dayjs(date).locale('ru').format('D MMMM YYYY') : date;

export const formatDateTime = (date: Date | undefined) =>
  date ? dayjs(date).locale('ru').format('D MMMM YYYY HH:mm') : date;
