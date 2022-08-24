const path = require('path')

// extracting the css from bundle.js to reduce its size
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { webpack } = require('webpack')
const { json } = require('express')

// configuring environment variable to set things up for the testing database
process.env.NODE.ENV = process.env.NODE.ENV || 'development'

if (process.env.NODE.ENV === 'test') {
    require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE.ENV === 'development') {
    require('dotenv').config({ path: '.env.development' })
}

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production'

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js',
            publicPath: '/dist/'
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
                use: [MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
                ]
            }],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            }),
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',
        devServer: {
            static: path.join(__dirname, 'public'), //this object is no longer necessary for our case since the default location that static looks in is public.
            historyApiFallback: true, //we're going to be handling routing via our client side code
        }
    }
}
