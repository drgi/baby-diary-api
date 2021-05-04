const express = require('express')
const port = 3000;
const apiRoute = require('./router/api.js')
const cors = require('cors')
// Db
require('./db/connection');
const app = express()

function createApp() {
    app.use(cors())
    app.use(express.json())
    app.use('/', express.static('static'))
    //app.use('/photos/', express.static('static/photos'))
    app.use('/api/', apiRoute)

    return app
}

if (!module.parent) {
    createApp().listen(port, () => {
        console.log(`Server start ${port}`)
    })
}

module.exports = createApp