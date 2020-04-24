
module.exports = ({ broker }) => ({
  name: 'notes',

  listAll() {
    return broker.call('notes.listAll')
  },

  getById({ id }) {
    return broker.call('notes.getById', { id })
  },

  create(note) {
    return broker.call('notes.create', note)
  }
})
