var htmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),

    config = {
      entry: './src/scripts/main.jsx',
      output: {
        path: path.resolve(__dirname,'build'),
        filename: 'bundle.js',
      },
      module: {
        loaders: [{
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: path.resolve(__dirname,'node_modules'),
          include: path.resolve(__dirname,'src/scripts'),
          query: {
            presets: ['react','latest']
          }
        },{
          test: /\.less$/,
          loader: 'style-loader!css-loader!less-loader'
        },{
          test: /\.(png|jpg)$/i,
          loader: 'file-loader',
          query: {
            // limit: 20000,
            name: 'assets/[name][hash:5].[ext]'
          }
        }]
      },
      plugins: [
        new htmlWebpackPlugin({
          filename: 'index.html',
          template: './src/template.html',
          inject: 'body',
          minify: {
            removeComments: true,
            collapseWhitespace: true
          }
        })
      ]
    };

module.exports = config;