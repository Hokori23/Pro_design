module.exports = {
  parserOptions: {
    // https://github.com/typescript-eslint/typescript-eslint/issues/251#issuecomment-463943250
    tsconfigRootDir: __dirname,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@material-ui/*/*/*', '!@material-ui/core/test-utils/*'],
        },
      ],
    },
  },
}
