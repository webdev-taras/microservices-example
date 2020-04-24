module.exports = class GatewayService {
  
  constructor({ notes, express, bodyParser, settings = {} }) {
    this.name = 'gateway'
    this.settings = {
      port: settings.port || 3001
    }
    this.notes = notes
    this.init({ express, bodyParser })
  }

  init({ express, bodyParser }) {
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    this.initRoutes(app)
    this.app = app
  }

  start() {
    const port = this.settings.port
    this.server = this.app.listen(port, function () {
      console.log(`gateway.service listening on port ${port}`)
    });
  }

  stop() {
    this.server.close(() => console.log('gateway.service stopped'))
  }

  initRoutes(app) {
    app.get('/notes', this.getNotes.bind(this))
    app.get('/notes/:id', this.getNote.bind(this))
    app.post('/notes', this.createNote.bind(this))
  }

  getNotes(req, res) {
    return this.notes.listAll()
      .then(this.handleResponse(res))
      .catch(this.handleError(res))
  }

  getNote(req, res) {
    const id = Number(req.params.id)
    return this.notes.getById({ id })
      .then(this.handleResponse(res))
      .catch(this.handleError(res))
  }

  createNote(req, res) {
    const payload = req.body
    return this.notes.create(payload)
      .then(this.handleResponse(res))
      .catch(this.handleError(res))
  }

  handleResponse(res) {
    return data => {
      res.status(200).send(data)
    }
  }
  
  handleError(res) {
    return err => {
      res.status(err.code || 500).send(err.message)
    }
  }
}