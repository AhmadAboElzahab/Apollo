const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.route')

const app = express()
require('dotenv').config()

app.use(express.json());
app.use('/api/user/', userRoutes)

mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_CONNECT).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Coneected on http://localhost:${process.env.PORT}/`);
    })

}).catch((error) => {
    console.log(error)
})

