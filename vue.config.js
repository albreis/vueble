module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vueble/' : '/',
  devServer: {
        host: 'everaldoreis.com.br',
        https: false,
        disableHostCheck: true
    }
}