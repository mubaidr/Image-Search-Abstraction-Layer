var mongoDB = require('mongodb')
var mongoClient = mongoDB.MongoClient()
var dbURL = 'mongodb://root:root@ds135384.mlab.com:35384/image-search-service'
// TODO move user/pass to system configuration

module.exports = {
  async getLatestSearches () {
    let db = await this.connect()
    console.log(db)
  },
  async searchImages () {
    let db = await this.connect()
    console.log(db)
  },
  async connect () {
    let db = await mongoClient.connect(dbURL)
    return db
  }
}
