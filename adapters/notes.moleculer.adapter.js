
module.exports = {
  name: 'notes',

  listAll({}) {
    return this.broker.call('notes.listAll')
  },

  getById({ id }) {
    return this.broker.call('notes.getById', { id })
  },

  create(note) {
    return this.broker.call('notes.create', note)
  }
}
