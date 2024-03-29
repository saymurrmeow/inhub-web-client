const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';

const ENTRY_POINT = path.resolve(__dirname, 'src/index.tsx');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname);

const PUBLIC_PATH = '/';

require('dotenv').config();

const DEVSERVER_PORT = process.env.DEVSERVER_PORT || 8000;

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      BROWSER: JSON.stringify(true),
    },
    ENV: JSON.stringify(process.env),
  }),
  new CleanWebpackPlugin({
    verbose: true,
    dry: true,
  }),
  new HtmlWebpackPlugin({
    template: 'static/index.html',
  }),
  new HotModuleReplacementPlugin(),
];

module.exports = {
  mode: devMode ? 'development' : 'production',

  entry: {
    main: ENTRY_POINT,
  },
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js',
    publicPath: PUBLIC_PATH,
  },
  resolve: {
    modules: [APP_DIR, 'node_modules'],
    extensions: ['.tsx', '.ts', '.json', '.js', '.jsx'],
  },
  stats: {
    warningsFilter: /export .* was not found in/,
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    port: DEVSERVER_PORT,
    hot: true,
    historyApiFallback: true,
  },
  experiments: {
    topLevelAwait: true,
  },
};
