#!/usr/bin/env node

import { startCli } from './controllers/commands.js'
import { connectDb } from './models/mongo.js'

async function start() {
  try {
    // primero que se conecte a la DB
    await connectDb() 
    // console.log('Database connected successfully')
    startCli()
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
}

start()
