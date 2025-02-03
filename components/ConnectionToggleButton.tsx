import React, { ReactElement } from 'react';
import { Button } from 'react-native';
import { selectOnlineStatus, toggleOnlineStatus } from '../slices/onlineSlice';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';

const ConnectionToggleButton = (): ReactElement => {
  const dispatch = useAppDispatch();
  const isOnline = useAppSelector(selectOnlineStatus);

  return (
    <Button
      onPress={() => dispatch(toggleOnlineStatus())}
      title={isOnline ? 'Online' : 'Offline'}
      color={isOnline ? 'green' : '#999'}
    />
  );
};

export default ConnectionToggleButton;
