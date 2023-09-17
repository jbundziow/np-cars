import express from 'express'
const app = express.Router();


app.get('/', (req,res,next) => {
    res.json({status: 'hello world'})
})


export default app;