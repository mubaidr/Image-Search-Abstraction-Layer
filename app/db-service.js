var mongoDB = require('mongodb')
var mongoClient = mongoDB.MongoClient()
var dbURL = 'mongodb://root:root@ds135384.mlab.com:35384/image-search-service'
// TODO move user/pass to system configuration

module.exports = {
  async getLatestSearches () {
    let db = await this.connect()
    let results = await db.collection('searches').find({}).sort({
      time: 1
    }).limit(5).toArray()

    return results
  },
  async searchImages (search, offset) {
    let db = await this.connect()
    let results = await db.collection('images').find({
      $text: {
        $search: search
      }
    }).skip(offset).limit(5).toArray()

    this.addSearch(search)
    return results
  },
  async connect () {
    let db = await mongoClient.connect(dbURL)
    return db
  },
  async addSearch (str) {
    let db = await this.connect()
    db.collection('searches').insertOne({
      query: str,
      time: new Date()
    })
  }
}
