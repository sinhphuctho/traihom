import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import spdy from 'spdy'
import fs from 'fs'
import path from 'path'

const app = express()
const server = spdy.createServer({
  key: fs.readFileSync(path.join(__dirname, '/../server.key')),
  cert: fs.readFileSync(path.join(__dirname, '/../server.crt'))
}, app)

app.use(compression())
app.use(helmet())
app.use(express.static(path.join(__dirname, '/../build')))

app.get('/', function (req, res) {
  res.sendFile('index.html');
});
server.listen(3000)