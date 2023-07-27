const express = require('express')
const errorHandler = require('./middleware/errorHandler.middleware')
const responseHandler = require('./middleware/responseHandler.middleware')
const mongoose = require('mongoose')

const Likes = require('./routes/User/Likes')
const Comments = require('./routes/User/Comments')
const Payment = require('./routes/User/Payments')

const AI = require('./routes/Admin/AI')
const Artwork = require('./routes/Admin/Artwork')
const Audio = require('./routes/Admin/Audio')
const Lyrics = require('./routes/Admin/Lyrics')
const Promo = require('./routes/Admin/Promo')
const Users = require('./routes/Admin/Users')


const app = express()
require('dotenv').config()

app.use(express.json());
app.use(errorHandler);
app.use(responseHandler);

app.use('/api/user/likes', Likes)
app.use('/api/user/Comments', Comments)
app.use('/api/user/Payment', Payment)

app.use('/api/admin/AI', AI)
app.use('/api/admin/Artwork', Artwork)
app.use('/api/admin/Audio', Audio)
app.use('/api/admin/Lyrics', Lyrics)
app.use('/api/admin/Promo', Promo)
app.use('/api/admin/Users', Users)





mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECT).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Coneected on http://localhost:${process.env.PORT}/`);
    })

}).catch((error) => {
    console.log(error)
})

