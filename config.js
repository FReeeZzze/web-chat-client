// eslint-disable-next-line no-undef
System.config({
  paths: {
    'src*': './src*',
    'components*': './src/components*',
    'layouts*': './src/layouts*',
    'constants*': './src/constants*',
    'context*': './src/context*',
    'hooks*': './src/hooks*',
    'pages*': './src/pages*',
    'store*': './src/store*',
    'utils*': './src/utils*',
    'scss*': './src/scss*',
    'core*': './src/core*',
  },
  packages: {
    'socket.io-client': { defaultExtension: 'js' },
  },
  map: {
    'socket.io-client': 'node_modules/socket.io-client/socket.io.js',
  },
});
