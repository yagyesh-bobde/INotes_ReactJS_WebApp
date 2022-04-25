const connectToMongo = require('./db')
var cors = require('cors')
const express = require('express')


// route pages
const notes = require('./routes/notes')
const auth = require('./routes/auth')

connectToMongo();
const app = express()
const port = 5000

app.use(express.json()) // this is the middleware which enables us to send json as response

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors())
//  Available routes
app.use('/api/notes',notes)
app.use('/api/auth',auth)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})