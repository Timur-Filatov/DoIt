import React, { ReactElement } from 'react';
import ConnectionToggleButton from './ConnectionToggleButton';
import ThemeToggleButton from './ThemeToggleButton';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../styles/styles';

const RightHeaderButtons = (): ReactElement => {
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
    gap: spacing.medium,
  },
});

export default RightHeaderButtons;
