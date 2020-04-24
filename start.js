const express = require('express')
const bodyParser = require('body-parser') 

const notes = require('./services/notes.service')
const GatewayService = require('./services/gateway.service')

const gateway = new GatewayService({
  notes,
  express,
  bodyParser,
  settings: { port: process.env.PORT }
})

process.on('exit', gateway.stop.bind(gateway))

const stopSignals = ['SIGINT', 'SIGUSR2', 'SIGTERM']

stopSignals.forEach((signal) =>
  process.on(signal, () => process.exit(130))
)

gateway.start()
