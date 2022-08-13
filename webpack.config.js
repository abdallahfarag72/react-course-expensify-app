const path = require('path')

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/ /* run babel through the files that end with .js only */,
            exclude: /node_modules/ /*don't run babel in node modules folder. all the libraries are already processed*/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }, {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }],
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {   
        static: path.join(__dirname, 'public'), //this object is no longer necessary for our case since the default location that static looks in is public.
        historyApiFallback: true, //we're going to be handling routing via our client side code
    }
}