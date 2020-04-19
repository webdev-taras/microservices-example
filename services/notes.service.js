const notes = require('../storages/notes.storage')

module.exports = {
  name: 'notes',

  listAll({}) {
    return Promise.resolve({ notes: notes.slice() })
  },

  getById({ id }) {
    return Promise.resolve(notes.find(note => note.id === id ))
  },

  create(payload) {
    const lastId = Math.max(...notes.map(note => note.id))
    const note = {
      id: lastId + 1,
      ...payload,
    }
    notes.push(note)
    // TODO: hook.after.create
    // this.broker.emit('note.created', note)
    return Promise.resolve(note)
  }
}