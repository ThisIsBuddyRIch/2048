/**
 * Created by ДНС on 26.01.2017.
 */

const NODE_ENV = "dev"

module.exports = {
    entry: "./src/index",
    output: {
        filename: "bundle.js"
    },

    devtool: "eval-source-map",
    watch : true,
    module: {
       loaders: [{
            test: /\.js$/,
            loader: "babel-loader?presets[]=es2015",
            exclude: "./node_models"
        }]
    }
}
