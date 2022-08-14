const path = require('path')
const express = require('express')
const app = express()
const publicPath = path.join(__dirname, '..', 'public')
// if PORT exists we're on heroku
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

// matching all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
    console.log('Server is up!');
})