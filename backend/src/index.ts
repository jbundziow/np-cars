import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import cookies from 'cookie-parser';
import path from 'path'




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
    origin: process.env.FRONTEND_URL, //frontend
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
app.use('/api/auth', authRoutes)

//for 'user'
app.use('/api/cars', requireAuthAsUser, carsRoutes)
app.use('/api/faults', requireAuthAsUser, faultsRoutes)
app.use('/api/refuelings', requireAuthAsUser, refuelingRoutes)
app.use('/api/users', requireAuthAsUser, usersRoutes)
app.use('/api/reservations', requireAuthAsUser, reservationsRoutes)
app.use('/api/rentals', requireAuthAsUser, rentalsRoutes)
app.use('/api/places', requireAuthAsUser, placesRoutes)
app.use('/api/stats', requireAuthAsUser, statsRoutes)

//for 'admin'
app.use('/api/admin', requireAuthAsAdmin, adminRoutes)

// *************************************************




// *************************************************
// SERVE FRONTEND (REACT APP)
// *************************************************
if(process.env.NODE_ENV === 'production') {
const clientPath = path.normalize(path.join(__dirname, process.env.FRONTEND_PATH || ''));
app.use(express.static(clientPath));
const rootRouter = express.Router();
rootRouter.get('(/*)?', async (req, res, next) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
  app.use(rootRouter);
}
// *************************************************




app.on('error', (error) => console.error('Server error', error));


