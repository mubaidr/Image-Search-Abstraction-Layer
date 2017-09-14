var express = require('express')
var path = require('path')
var url = require('url')

var dbService = require('./db-service')

var app = express()
var port = process.env.PORT || 9000

/* static resources */
app.use(express.static(path.join(__dirname, 'public')))

/* favicon */
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/favicon.png'))
})

/* invalid */
app.get('/404', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/404.html'))
})

/* new search */
app.get('/api/imagesearch/:search', function (req, res) {
  let search = req.params.search
  let offset = url.parse(req.originalUrl, true).query.offset || 10

  dbService.searchImages(search, offset).then(result => {
    res.send(result)
  }).catch(err => {
    res.status(500).send(err)
  })
})

/* latest searches */
app.get('/api/imagesearch', function (req, res) {
  dbService.getLatestSearches().then(result => {
    res.send(result)
  }).catch(err => {
    res.status(500).send(err)
  })
})

/* all others */
app.get('*', function (req, res) {
  res.redirect('/404')
})

/* start app */
app.listen(port)
