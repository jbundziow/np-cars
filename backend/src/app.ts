import express from 'express'
import bodyParser from 'body-parser'

import carsRoutes from './routes/cars'
import adminRoutes from './routes/admin'


const app = express();
const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/cars', carsRoutes)
app.use('/admin', adminRoutes)








