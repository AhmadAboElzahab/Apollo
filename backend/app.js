const express = require('express');
const errorHandler = require('./middleware/errorHandler.middleware');
const responseHandler = require('./middleware/responseHandler.middleware');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const Interactions = require('./routes/User/Interactions');
const Comments = require('./routes/User/Comments');
const Payment = require('./routes/User/Payments');

const AI = require('./routes/Admin/AI');
const Artwork = require('./routes/Admin/Artwork');
const Audio = require('./routes/Admin/Audio');
const Lyrics = require('./routes/Admin/Lyrics');
const Promo = require('./routes/Admin/Promo');
const Users = require('./routes/Admin/Users');
const Telegram = require('./routes/Admin/Telegram');
const Category = require('./routes/Admin/Category');

const Shop = require('./routes/Shop');

const Auth = require('./routes/user.route');

const app = express();
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(errorHandler);
app.use(responseHandler);
app.use(cookieParser());

app.use('/api/user/Interactions', Interactions);
app.use('/api/user/Payment', Payment);

app.use('/api/admin/AI', AI);
app.use('/api/admin/Artwork', Artwork);
app.use('/api/admin/Audio', Audio);
app.use('/api/admin/Lyrics', Lyrics);
app.use('/api/admin/Promo', Promo);
app.use('/api/admin/Users', Users);
app.use('/api/admin/Category', Category);
app.use('/api/admin/Telegram', Telegram);

app.use('/api/shop', Shop);

app.use('/api/auth/', Auth);

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Coneected on http://localhost:${process.env.PORT}/`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
