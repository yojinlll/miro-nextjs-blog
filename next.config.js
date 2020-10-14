const widthImages  =  require("next-images")

module.exports = widthImages({
  webpack: (config, options) => {
    return config
  },
})

// webpack 配置file-loader
// module.exports = {
//   webpack: (config, options) => {
//     const isServer = options.isServer
//     config.module.rules.push({
//       test: /\.(png|jpe?g|gif|svg)$/i,
//       use: [
//         {
//           loader: "file-loader",
//           options:{
//             name: "[name].[contenthash].[ext]",
//             outputPath: "static",
//             publicPath: "_next/static"
//           }
//         }
//       ],
//     })

//     return config
//   },
// }