module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:react-redux/recommended', 'plugin:prettier/recommended'],
  plugins: ['react-redux'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
