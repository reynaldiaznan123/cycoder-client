const { BannerPlugin } = require("webpack");
const version = require("../package.json").version;

module.exports = {
    entry: ['@babel/polyfill', './build/index.js'],
    output: {
        filename: 'cycoder-client.js',
        path: __dirname + '/../examples/public/js',
        // library: 'Client',
        libraryTarget: "umd",
        // see https://github.com/webpack/webpack/issues/6525
        globalObject: `
            (() => {
                if (typeof self !== 'undefined') {
                    return self;
                } else if (typeof window !== 'undefined') {
                    return window;
                } else if (typeof global !== 'undefined') {
                    return global;
                } else {
                    return Function('return this')();
                }
            })()
        `,
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-object-assign'],
                    },
                },
            },
        ],
    },
};