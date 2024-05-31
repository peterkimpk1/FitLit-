const path = require('path');
module.exports = {
  "mode": "none",
  "entry": "./src/scripts.ts",
  "output": {
    "path": __dirname + '/dist',
    "filename": "bundle.js",
    sourceMapFilename: "bundle.js.map"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  "devtool": "source-map",
  // CSS and file (image) loaders
  "module": {
    "rules": [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};