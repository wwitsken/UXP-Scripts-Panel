const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
});
const webpack = require('webpack');

module.exports = function (_env, argv) {
  const isProduction = argv.mode === 'production';
  const isDevelopment = !isProduction;

  return {
    devtool: isDevelopment && 'cheap-module-source-map',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      publicPath: '/',
    },
    externals: {
      indesign: 'commonjs2 indesign',
      uxp: 'commonjs2 uxp',
    },
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules')],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/,
          resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                envName: isProduction ? 'production' : 'development',
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: 'plugin' }],
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({ ...process.env, ...dotenv.parsed }),
      }),
    ],
  };
};
