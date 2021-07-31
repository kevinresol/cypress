module.exports = {
  e2e: {
    setupNodeServer (on, config) {
      return new Promise((resolve) => {
        setTimeout(resolve, 100)
      })
      .then(() => {
        config.defaultCommandTimeout = 500
        config.videoCompression = 20
        config.env = config.env || {}
        config.env.foo = 'bar'

        return config
      })
    },
  },
}