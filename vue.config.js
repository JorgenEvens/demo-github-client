module.exports = {
    devServer: {
        before(app) {
            app.use(require('./src/api'));
        }
    }
}
