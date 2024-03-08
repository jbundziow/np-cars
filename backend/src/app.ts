import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import cookies from 'cookie-parser';




import authRoutes from './routes/auth'
import carsRoutes from './routes/cars'
import adminRoutes from './routes/admin'
import faultsRoutes from './routes/faults'
import refuelingRoutes from './routes/refuelings'
import usersRoutes from './routes/users'
import reservationsRoutes from './routes/reservations'
import rentalsRoutes from './routes/rentals'
import placesRoutes from './routes/places'
import statsRoutes from './routes/stats'

import { requireAuthAsAdmin, requireAuthAsUser } from "./middleware/authMiddleware"


require('dotenv').config(); //https://www.npmjs.com/package/dotenv

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', //frontend
    credentials: true, // Enable credentials (cookies)
}

app.use(cors(corsOptions)) 

const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookies())


app.use(express.static('public'));


// *************************************************
// ROUTES

//for all users
app.use('/auth', authRoutes)

//for 'user'
app.use('/cars', requireAuthAsUser, carsRoutes)
app.use('/faults', requireAuthAsUser, faultsRoutes)
app.use('/refuelings', requireAuthAsUser, refuelingRoutes)
app.use('/users', requireAuthAsUser, usersRoutes)
app.use('/reservations', requireAuthAsUser, reservationsRoutes)
app.use('/rentals', requireAuthAsUser, rentalsRoutes)
app.use('/places', requireAuthAsUser, placesRoutes)
app.use('/stats', requireAuthAsUser, statsRoutes)

//for 'admin'
app.use('/admin', requireAuthAsAdmin, adminRoutes)

// *************************************************
