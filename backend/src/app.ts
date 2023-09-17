import express from 'express'
import bodyParser from 'body-parser'

import indexRoutes from './routes/index'

// import db from './database/database'
const db = require('./database/database')

const app = express();
const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRoutes)


console.log('sds');





