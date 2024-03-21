import React from 'react';
import ConnectionToggleButton from './ConnectionToggleButton';
import ThemeToggleButton from './ThemeToggleButton';
import { StyleSheet, View } from 'react-native';

export const RightHeaderButtons: React.FC = () => {
  return (
    <View style={styles.container}>
      <ConnectionToggleButton />
      <ThemeToggleButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
});
