const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/user');
const Product = require('../models/product');
const DiscountCodes = require('../models/discountCodes');
const passport = require('passport');
const { engine } = require('express-handlebars');
const { Strategy: JwtStrategy } = require('passport-jwt');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;
const flag = process.env.FLAG || 'citadel{test_flag}';
const databasename = 'citadel';
const uri = process.env.MONGO_CONNECTION_URI || `mongodb://127.0.0.1:27017/${databasename}`;
console.log(uri)

mongoose.set('strictQuery', false);
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: databasename })
  .then(async () => {
    console.log('Im in');

    
    const app = express();
    app.use(passport.initialize());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'base' }));
    app.use(express.static('static'));
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '../webviews'));
    app.use('/', require('./routes'));

    passport.use('user-local', User.createStrategy());

    const option = {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: (req) => req?.cookies?.['jwt'],
      algorithms: ['HS256'],
    };

    passport.use(
      new JwtStrategy(option, (payload, next) => {
        User.findOne({ _id: payload.userId })
          .then((user) => {
            next(null, { userId: user._id } || false);
          })
          .catch((_) => next(null, false));
      })
    );

    
    const products = [
      { productId: 1, Name: "Basic Pocket", Description: "A simple storage device used by Regulars to carry basic items during their climb.", Cost: "Free" },
      { productId: 2, Name: "Observer's Lighthouse", Description: "A small reconnaissance device that provides basic light and communication abilities.", Cost: "1 Shinsu Point" },
      { productId: 3, Name: "Training Needle", Description: "A practice weapon used by Fishermen to learn basic combat techniques in the Tower.", Cost: "2 Shinsu Points" },
      {
        productId: 4,
        Name: "Guardian's Secret Scroll",
        Description: "Ancient knowledge from the Tower's Guardian containing forbidden secrets about the upper floors.",
        Cost: "50 Shinsu Points",
        FLAG: flag
      }
    ];

    for (const productData of products) {
      const existingProduct = await Product.findOne({ productId: productData.productId });
      if (!existingProduct) {
        await Product.create(productData);
        console.log(`Inserted productId: ${productData.productId}`);
      } else {
        console.log(`Product with productId: ${productData.productId} already exists.`);
      }
    }

    
    await DiscountCodes.deleteMany({});
    await DiscountCodes.create({
      discountCode: 'fake_code',
      value: 5
    });
    

    app.use('/', (req, res) => {
      res.status(404);
      if (req.accepts('html') || req.accepts('json')) {
        return res.render('notfound');
      }
    });

    
    console.log(`Initializing... `);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
