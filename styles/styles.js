import { StyleSheet } from 'react-native';

export const colors = {
  light: '#f5f5f5',
  dark: '#222222',
  gray: '#999999',
  white: '#ffffff',
  black: '#000000',
};

export const spacing = {
  small: 5,
  medium: 10,
  large: 15,
  xLarge: 20,
};

export const borderRadius = {
  small: 5,
  medium: 8,
  large: 10,
};

export const fontSize = {
  small: 12,
  medium: 15,
  large: 18,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
  },
  header: {
    fontWeight: 'bold',
    fontSize: fontSize.large,
  },
  border: {
    borderWidth: 1,
    borderRadius: borderRadius.small,
    borderColor: colors.gray,
  },
  titleInput: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  multlineInput: {
    textAlignVertical: 'center',
    minHeight: 100,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    verticalAlign: 'top',
  },
});
