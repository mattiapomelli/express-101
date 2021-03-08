const express = require('express')
const app = express()

// Database
const songs = [
  {
    id: 1,
    title: 'Mi piacciono i broccoli!!!!',
    author: 'Tia',
  },
  {
    id: 2,
    title: 'Mi piacciono i draghi',
    author: 'Rompa',
  },
  {
    id: 3,
    title: 'Mi piacciono i coltelli',
    author: 'Valdoz',
  },
  {
    id: 4,
    title: 'New song!!',
    author: 'Valdoz',
  },
]

// REST API

const port = process.env.PORT || 5000

app.use(express.json())

// Routes

// GET: /songs -> restituisce tutte le canzoni
app.get('/songs', (req, res) => {
  res.status(200).json(songs)
})

// GET: /song/:id -> restituisce la canzone con id
app.get('/song/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const mysong = songs.find((obj) => obj.id === id)

  if (!mysong) res.status(404).send(`Song not found with id: ${id}`)

  res.status(200).json(mysong)
})

app.post('/song', (req, res) => {
  const { title, author } = req.body

  // Gestire dati non presenti
  if (!title || !author)
    return res.status(400).send('Title or author not provided')

  // Aggiungere la canzone
  const lastsong = songs[songs.length - 1]

  const newsong = {
    id: lastsong.id + 1,
    title,
    author,
  }

  songs.push(newsong)

  // Restituire una risposta
  res
    .status(200)
    .send(`Inserted song with title: ${title} and author: ${author}`)
})

app.patch('/song/:id', (req, res) => {
  const { title } = req.body
  if (!title) return res.status(400).send('Missing title')

  const id = parseInt(req.params.id)

  const oldsong = songs.find((s) => s.id === id)
  if (!oldsong) return res.status(404).send(`No song found with id: ${id}`)

  oldsong.title = title

  return res.status(200).json(oldsong)
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

// STATUS:
// 200: OK
// 404: Not Found
// 400: Bad Request
// 401: Unauthorized
// 403: Forbidden
// 500: Internal Server Error
