const notes = require('../services/notes.service')

module.exports = {
  name: 'notes',

  actions: {
    listAll(ctx) {
      return notes.listAll()
    },
    getById(ctx) {
      const id = Number(ctx.params.id)
      return notes.getById({ id })
    },
    create(ctx) {
      return notes.create(ctx.params)
        .then(note => {
          this.broker.emit('note.created', note)
          return note
        })
    }
  },
}