import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, RootState } from '../../services/store';
import { useSelector } from 'react-redux';
import { getFeeds } from '../../services/slices/orderSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.order.orders
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);
  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
