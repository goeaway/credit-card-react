const path = require("path");

module.exports = env => {
    const production = env.production === "production";

    const alias = {
        "@src": path.join(__dirname, "src")
    };

    if(production) {
        alias["react"] = "preact/compat";
        alias["react-dom"] = "preact/compat";
    }

    return {
        entry: "./src/index.tsx",
        mode: production ? "production" : "development",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
            publicPath: "/output"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            alias
        },
        module: {
            rules: [
                { 
                    test: /\.tsx?$/, 
                    loader: 'ts-loader', 
                    exclude: /node_modules/ 
                }
            ]
        },
        devServer: {
            contentBase: "./wwwroot",
            publicPath: "/output",
            hot: true,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            historyApiFallback: true,
            index: "index.html"
        }
    }
}