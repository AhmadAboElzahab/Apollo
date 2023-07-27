const express = require('express')
const errorHandler = require('./middleware/errorHandler.middleware')
const responseHandler = require('./middleware/responseHandler.middleware')
const mongoose = require('mongoose')
const userRoutes = require('./routes/User/pay.route')
const userRoutes1 = require('./routes/user.route')


const app = express()
require('dotenv').config()

app.use(express.json());
app.use(errorHandler);
app.use(responseHandler);

app.use('/api/user/', userRoutes)
app.use('/api/user/', userRoutes1)



mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECT).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Coneected on http://localhost:${process.env.PORT}/`);
    })

}).catch((error) => {
    console.log(error)
})

