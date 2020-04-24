const express = require('express')
const bodyParser = require('body-parser') 

const NotesAdapter = require('../adapters/notes.moleculer.adapter')
const GatewayService = require('../services/gateway.service')

module.exports = {
  name: 'gateway',

  created() {
    const notes = NotesAdapter({ broker: this.broker })
    this.gateway = new GatewayService({
      notes,
      express,
      bodyParser,
      settings: { port: process.env.PORT }
    })
  },
  started() {
    this.gateway.start()
  },
  stopped() {
    this.gateway.stop()
  }
}