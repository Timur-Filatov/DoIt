import React, { ReactElement } from 'react';
import { Button } from 'react-native';
import { useOnlineStatus } from '../contexts/OnlineStatusContext';

const ConnectionToggleButton = (): ReactElement => {
  const { isOnline, toggleOnlineStatus } = useOnlineStatus();

  return (
    <Button
      onPress={toggleOnlineStatus}
      title={isOnline ? 'Online' : 'Offline'}
      color={isOnline ? 'green' : '#999'}
    />
  );
};

export default ConnectionToggleButton;
