const express = require('express')
const bodyParser = require('body-parser') 

module.exports = {
  name: 'gateway',

  settings: {
    port: process.env.PORT || 3001,
  },
  methods: {
    initRoutes(app) {
      app.get('/notes', this.getNotes)
      app.get('/notes/:id', this.getNote)
      app.post('/notes', this.createNote)
    },
    getNotes(req, res) {
      return Promise.resolve()
        .then(() => {
          return this.broker.call('notes.listAll').then(notes => {
            res.send(notes)
          })
        })
        .catch(this.handleErr(res))
    },
    getNote(req, res) {
      const id = req.params.id
      return Promise.resolve()
        .then(() => {
          return this.broker.call('notes.getById', {id: id}).then(note => {
            res.send(note)
          })
        })
        .catch(this.handleErr(res))
    },
    createNote(req, res) {
      const payload = req.body
      return Promise.resolve()
      .then(() => {
        return this.broker.call('notes.create', payload).then(note =>
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
  },
  started() {
    const port = this.settings.port
    this.app.listen(port, function () {
      console.log(`gateway.agent listening on port ${port}`);
    });
  },
  stopped() {
    this.app.close(() => console.log('gateway.agent stopped'));
  }
}