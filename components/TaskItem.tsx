import React, { ReactElement } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../styles/themes';
import { colors, spacing, borderRadius, fontSize } from '../styles/styles';

interface TaskItemProps {
  title: string | null;
  imageUrl: string | null;
}

const TaskItem = ({ title, imageUrl }: TaskItemProps): ReactElement => {
  const { isDarkTheme } = useTheme();
  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text style={[styles.image, styles.noImagePlaceholder]}>No Image</Text>
      )}
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.medium,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: spacing.medium,
    borderRadius: borderRadius.large,
  },
  title: {
    fontWeight: 'bold',
    fontSize: fontSize.medium,
    flex: 1,
    textAlignVertical: 'center',
  },
  noImagePlaceholder: {
    backgroundColor: colors.gray,
    padding: spacing.small,
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: fontSize.small,
    color: colors.dark,
  },
});

export default TaskItem;
