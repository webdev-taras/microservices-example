module.exports = {
  name: 'notification',
  events: {
    'note.created': {
      group: 'other',
      handler(payload) {
          console.log(`Recieved 'note.created' event in notification service with payload: ${payload}`)
      }
    }
  },
}