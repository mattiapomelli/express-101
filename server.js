const express = require('express')
const app = express()

// Parse incoming requests with JSON payload
app.use(express.json())

// Fake Database of songs
const songs = [
  {
    id: 1,
    title: 'I love clean code',
    author: 'Tia',
  },
  {
    id: 2,
    title: 'I love dragons',
    author: 'Rompa',
  },
  {
    id: 3,
    title: 'I love blockchain',
    author: 'Valdoz',
  },
]

// Get all songs
app.get('/songs', (req, res) => {
  res.status(200).json(songs)
})

// Get a song by id
app.get('/song/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const song = songs.find((s) => s.id === id)

  if (!song) res.status(404).send(`No song found with id: ${id}`)

  res.status(200).json(song)
})

// Create new song with given title and author
app.post('/songs', (req, res) => {
  const { title, author } = req.body

  if (!title || !author)
    return res.status(400).send('Title or author not provided')

  const lastId = songs[songs.length - 1].id

  const newsong = {
    id: lastId + 1,
    title,
    author,
  }

  songs.push(newsong)

  res
    .status(200)
    .send(`Created new song with title: ${title}, and author: ${author}`)
})

// Modify a song by id, given a new title
app.patch('/song/:id', (req, res) => {
  const { title } = req.body

  if (!title)
    return res.status(400).send('Please provide a new title for the song')

  const id = parseInt(req.params.id)

  const song = songs.find((s) => s.id === id)
  if (!song) return res.status(404).send(`No song found with id: ${id}`)

  song.title = title

  return res.status(200).json(song)
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
