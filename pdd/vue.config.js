module.exports = {
  devServer: {
    // hot: true,
    // host: 'localhost',
    // port: 3000,
    proxy: {
      '/api': { // 名字必须跟application context相同 否则404
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true, //  跨域
        pathRewrite: {
          '^/api': ''
        }
      },
      '/pdd_api': { // 名字必须跟application context相同 否则404
        target: 'http://mobile.yangkeduo.com/proxy/api/api/barrow/query',
        ws: true,
        changeOrigin: true, //  跨域
        pathRewrite: {
          '^/pdd_api': ''
        }
      }
    }
  }
}
