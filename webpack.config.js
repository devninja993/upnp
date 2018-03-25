var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var bootstrapEntryPoints = require('./webpack.bootstrap.config');

var extractPlugin = new ExtractTextPlugin({
   filename: '[name].css'
});

module.exports = {
    entry: {
      app:'./src/js/app.js',
      'patreon':'./src/pages/patreon/js/app.js',
      'about':'./src/pages/about/js/app.js',
      'contact':'./src/pages/contact/js/app.js',
      'volountieer-service':'./src/pages/volountieer-service/js/app.js',
      'gallery':'./src/pages/gallery/js/app.js',
      'news':'./src/pages/news/js/app.js',
      'single-news':'./src/pages/single-news/js/app.js',
      bootstrap:bootstrapEntryPoints.dev
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
        sourceMapFilename: '[name].[hash:8].map',
        chunkFilename: '[id].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            },
            { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
            { test: /\.(ttf|eot)$/, loader: 'file-loader' }
        ]
    },
    devServer:{
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 4202,
      host: '0.0.0.0',
      hot:false,
      quiet: false
    },
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({
          title: 'Landing',
          chunks: ['app', 'bootstrap'],
          template: 'src/index.html',// Load a custom template
          inject: 'body', // Inject all scripts into the body
          filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
          title: 'Sponsors',
          chunks: ['patreon', 'bootstrap'],
          template: 'src/pages/patreon/index.html', // Load a custom template
          inject: 'body', // Inject all scripts into the body
          filename: 'patreon.html'
        }),
        new HtmlWebpackPlugin({
          title: 'O nama',
          chunks: ['about', 'bootstrap'],
          template: 'src/pages/about/index.html', // Load a custom template
          inject: 'body', // Inject all scripts into the body
          filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
          title: 'Kontakt',
          chunks: ['contact', 'bootstrap'],
          template: 'src/pages/contact/index.html', // Load a custom template
          inject: 'body', // Inject all scripts into the body
          filename: 'contact.html'
        }),
        new HtmlWebpackPlugin({
          title: 'Volonterski Servis',
          chunks: ['volountieer-service', 'bootstrap'],
          template: 'src/pages/volountieer-service/index.html', // Load a custom template
          inject: 'body', // Inject all scripts into the body
          filename: 'volountieer-service.html'
        }),
        new HtmlWebpackPlugin({
          title: 'Galerija',
          chunks: ['gallery', 'bootstrap', 'carousel-gallery'],
          template: 'src/pages/gallery/index.html', // Load a custom template
          inject: 'body', // Inject all scripts into the body
          filename: 'gallery.html'
        }),
        new HtmlWebpackPlugin({
          title: 'Galerija',
          chunks: ['news', 'bootstrap'],
          template: 'src/pages/news/index.html', // Load a custom template
          inject: 'body', // Inject all scripts into the body
          filename: 'news.html'
        }),
        new HtmlWebpackPlugin({
          title: 'Vest',
          chunks: ['single-news', 'bootstrap'],
          template: 'src/pages/single-news/index.html', // Load a custom template
          inject: 'body', // Inject all scripts into the body
          filename: 'single-news.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          Popper: 'popper.js/dist/umd/popper.js',
          Tether: 'tether',
          'window.Tether': 'tether',
          Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
          Button: 'exports-loader?Button!bootstrap/js/dist/button',
          Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
          Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
          Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
          Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
          Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
          Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
          Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
          Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
          Util: 'exports-loader?Util!bootstrap/js/dist/util'
        })
    ]
};
