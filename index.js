// code away!
// require('dotenv').config()
const express = require('express')

const PORT = process.env.PORT || 3300
const server = express()
server.use(express.json())

// endpoints are
server.get('/api', (req, res) => {
  res.json({ message: 'API is up!!!'})
})

server.listen(PORT, () => {
  console.log('listening on' + PORT)
})