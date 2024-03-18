import React from 'react';
import { Button } from 'react-native';
import { useOnlineStatus } from './OnlineStatusContext';

const ConnectionToggleButton: React.FC = () => {
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
