const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello world')
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))