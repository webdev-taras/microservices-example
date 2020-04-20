const express = require('express')
const bodyParser = require('body-parser') 

module.exports = {
  name: 'gateway',

  settings: {
    port: process.env.PORT || 3001,
  },
  methods: {
    initRoutes(app) {
      app.get('/notes', this.getnotes)
      app.get('/notes/:id', this.getnote)
      app.post('/notes', this.createnote)
    },
    getnotes(req, res) {
      return Promise.resolve()
        .then(() => {
          return this.broker.call('notes.listAll').then(notes => {
            res.send(notes)
          })
        })
        .catch(this.handleErr(res))
    },
    getnote(req, res) {
      const id = req.params.id
      return Promise.resolve()
        .then(() => {
          return this.broker.call('notes.getById', {id: id}).then(note => {
            res.send(note)
          })
        })
        .catch(this.handleErr(res))
    },
    createnote(req, res) {
      const payload = req.body
      return Promise.resolve()
      .then(() => {
        return this.broker.call('notes.create', { payload }).then(note =>
          res.send(note)
        )
      })
      .catch(this.handleErr(res))
    },
    handleErr(res) {
      return err => {
        res.status(err.code || 500).send(err.message)
      }
    }
  },
  created() {
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    this.initRoutes(app)
    this.app = app
  }
}