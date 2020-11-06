module.exports = {
    chainWebpack: (config) => {
        // Pug Loader
        config.module
            .rule('csv')
            .test(/\.csv$/)
            .use('csv-loader')
            .loader('csv-loader')
            .end();
    },
};