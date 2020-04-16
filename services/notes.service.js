const notes = [
  {id: 1, title: 'note 1'},
  {id: 2, title: 'note 2', checked: false },
  {id: 2, title: 'note 3'},
]

module.exports = {
  name: 'notes',

  actions: {
    listAll(ctx) {
      return Promise.resolve({ notes: notes })
    },
    getById(ctx) {
      const id = Number(ctx.params.id)
      return Promise.resolve(notes.find(note => note.id === id ))
    },
    create(ctx) {
      const lastId = Math.max(...notes.map(note => note.id))
      const note = {
        id: lastId + 1,
        ...ctx.params.payload,
      }
      notes.push(note)
      this.broker.emit('note.created', note)
      return Promise.resolve(note)
    }
  },
}