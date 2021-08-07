module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3080/api',
                changeOrigin: true,
                secure: false
            }
        }
    }
}