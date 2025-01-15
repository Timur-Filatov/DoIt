import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RightHeaderButtons from '../components/RightHeaderButtons';
import { lightTheme, darkTheme } from '../styles/themes';
import { colors, spacing, globalStyles } from '../styles/styles';

const CustomToolbar = ({ isDarkTheme }) => {
  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <View style={[styles.toolbarContainer, { backgroundColor: theme.colors.headerBackground }]}>
      <Text style={[globalStyles.header, { color: theme.colors.headerText }]}>Tasks List</Text>

      <RightHeaderButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.medium,
    backgroundColor: colors.white,
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    zIndex: 1,
  },
});

export default CustomToolbar;
