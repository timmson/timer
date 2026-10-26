const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const outputDir = path.resolve(__dirname, "./dist");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: outputDir,
        filename: "index.js",
        // Базовый путь project Pages: https://timmson.github.io/timer/
        publicPath: "/timer/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                loader: "ts-loader",
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                quietDeps: true,
                                silenceDeprecations: ["legacy-js-api"]
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "index.css" }),
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
        // Статика (иконки, звук, service worker, манифест) ложится в корень сборки как есть
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/static", to: outputDir }
            ]
        })
    ],
    devServer: {
        static: {
            directory: outputDir,
        },
        compress: true,
        port: 3000
    }
};