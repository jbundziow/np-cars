import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import cookies from 'cookie-parser';

import authRoutes from './routes/auth'
import carsRoutes from './routes/cars'
import adminRoutes from './routes/admin'
import faultsRoutes from './routes/faults'
import refuelingRoutes from './routes/refueling'
import usersRoutes from './routes/users'
import reservationsRoutes from './routes/reservations'
import rentalsRoutes from './routes/rentals'

import { requireAuthAsUser } from "./middleware/authMiddleware"

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173'
}

app.use(cors(corsOptions)) 

const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookies())


//for all users
app.use('/auth', authRoutes)

//for 'user'
app.use('/cars', requireAuthAsUser, carsRoutes)
app.use('/faults', faultsRoutes)
app.use('/refuelings', refuelingRoutes)
app.use('/users', usersRoutes)
app.use('/reservations', reservationsRoutes)
app.use('/rentals', rentalsRoutes)

//for 'admin'
app.use('/admin', adminRoutes)






