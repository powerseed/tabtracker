const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../server/public')
  },
  devServer:{
    proxy: 'http://localhost:8081'
  }
}
