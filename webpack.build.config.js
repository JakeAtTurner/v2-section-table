const path = require('path');
const webpack = require('webpack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const os = require('os');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index')
    },
    
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        library: 'V2Table',
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            }
        ]
    },

    stats: {
        children: false
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        }),  
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            },
            cssProcessor: require('cssnano'),
            assetNameRegExp: /\.less|\.css$/g
        }),

        new ParallelUglifyPlugin({
            workerCount: os.cpus().length,
            cacheDir: '.cache/',
            sourceMap: true,
            uglifyJS: {
                compress: {
                    warnings: false,
                    /* eslint-disable */
                    drop_debugger: true,
                    drop_console: true
                },
                mangle: true
            }
        }),

        new webpack.optimize.ModuleConcatenationPlugin(),  
        new ProgressBarPlugin()
    ]
}