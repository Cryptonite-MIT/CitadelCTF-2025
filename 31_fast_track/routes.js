const express = require('express');
const JWT = require('jsonwebtoken');
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');

const UserProducts = require('../models/userproduct');
const Product = require('../models/product');
const User = require('../models/user');
const DiscountCodes = require('../models/discountCodes');

const router = express.Router();

const isAuth = (req, res, next) => {
  passport.authenticate('jwt', { 
    session: false, 
    failureRedirect: '/user-login' 
  })(req, res, next);
};

const parseCost = (cost) => {
  if (cost.toLowerCase() === 'free') {
    return 0;
  }
  const match = cost.match(/\d+/);
  return match ? parseInt(match[0], 10) : NaN;
};

router.get('/', (req, res, next) => {
  passport.authenticate('jwt', async (err, r) => {
    const { userId } = r || {};
    
    if (!userId) {
      return res.render('home', { Authenticated: false });
    }
    
    try {
      const user = await User.findById(userId)
        .populate({
          path: 'ownedproducts',
          populate: {
            path: 'productId',
            model: 'Product'
          }
        })
        .exec();
      
      const ownedproducts = user.ownedproducts.map((userProduct) => {
        const product = userProduct.productId;
        return {
          Name: product.Name,
          Description: product.Description,
          Cost: product.Cost,
          FLAG: product.FLAG || null,
          transactionId: userProduct.transactionId
        };
      });
      
      return res.render('home', {
        Authenticated: true,
        username: user.username,
        Balance: user.Balance,
        ownedproducts
      });
    } catch (err) {
      console.error('Error fetching user or products:', err);
      return next(err);
    }
  })(req, res, next);
});

router.get('/store', isAuth, async (req, res) => {
  try {
    const all = await Product.find();
    const products = all.map(p => ({
      productId: p.productId,
      Name: p.Name,
      Description: p.Description,
      Cost: p.Cost
    }));
    
    const user = await User.findById(req.user.userId);
    return res.render('store', { 
      Authenticated: true, 
      Balance: user.Balance, 
      Product: products 
    });
  } catch {
    return res.render('error', { 
      Authenticated: true, 
      message: 'Error during request' 
    });
  }
});

router.post('/store', isAuth, async (req, res, next) => {
  const { productId } = req.body;
  
  if (!productId) {
    return next({ message: 'productId is required.' });
  }
  
  try {
    const all = await Product.find();
    const product = all.find(p => p.productId === productId);
    
    if (!product) {
      return next({ message: 'Product not found.' });
    }
    
    const productCost = parseCost(product.Cost);
    
    if (isNaN(productCost)) {
      return next({ message: 'Invalid product cost format.' });
    }
    
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return next({ message: 'User not found.' });
    }
    
    if (user.Balance < productCost) {
      return res.json({
        success: false,
        message: 'Insufficient Shinsu Points to acquire this item.'
      });
    }
    
    const transactionId = uuidv4();
    
    user.Balance -= productCost;
    await user.save();
    
    const userProduct = new UserProducts({
      transactionId,
      user: user._id,
      productId: product._id
    });
    await userProduct.save();
    
    if (!user.ownedproducts.includes(userProduct._id)) {
      user.ownedproducts.push(userProduct._id);
      await user.save();
    }
    
    const responseData = {
      success: true,
      message: `Item acquired successfully! Remaining balance: ${user.Balance} Shinsu Points`,
      product: {
        Name: product.Name,
        Description: product.Description
      }
    };
    
    if (product.productId === 4) {
      responseData.product.FLAG = product.FLAG || 'No flag available';
    }
    
    return res.json(responseData);
  } catch (error) {
    console.error('Error during product purchase:', error);
    return res.json({
      success: false,
      message: 'An error occurred during purchase.'
    });
  }
});

router.get('/redeem', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const { discountCode } = req.query;
    
    if (!discountCode) {
      return res.render('redeemVoucher', { 
        Authenticated: true, 
        Balance: user.Balance 
      });
    }

    const discount = await DiscountCodes.findOne({ discountCode });
    
    if (!discount) {
      return res.json({ success: false, message: 'Invalid discount code!' });
    }

    const actualDiscountCode = discount.discountCode;
    
    console.log(`[${new Date().toISOString()}] Processing voucher: ${actualDiscountCode} for user: ${user.username}`);
    
    const initialUser = await User.findById(req.user.userId);
    const initialRedeemed = initialUser.redeemedVouchers || [];
    
    if (initialRedeemed.includes(actualDiscountCode)) {
      return res.json({
        success: false,
        message: 'Voucher already redeemed!'
      });
    }
    
    console.log(`Thread reading initial balance: ${initialUser.Balance}`);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(`Thread performing atomic increment of +${discount.value}`);
    
    await User.updateOne(
      { _id: req.user.userId },
      {
        $inc: { Balance: discount.value },
        $addToSet: { redeemedVouchers: actualDiscountCode }
      }
    );
    
    const updatedUser = await User.findById(req.user.userId);
    const newBalance = updatedUser.Balance;
    
    console.log(`Thread completed: final balance ${newBalance}`);

    return res.json({
      success: true,
      message: `Voucher redeemed! New Balance: ${newBalance} Shinsu Points`,
      code: actualDiscountCode,
      value: discount.value,
      newBalance
    });
  } catch (error) {
    console.error('Error during voucher redemption:', error);
    return res.json({ 
      success: false, 
      message: 'Error redeeming voucher' 
    });
  }
});

router.get('/register-user', (req, res) => {
  return res.render('register-user');
});

router.post('/register-user', (req, res, next) => {
  const { username, password } = req.body;
  
  if (username == null || password == null) {
    return next({ message: 'Error' });
  }
  
  if (!username || !password) {
    return next({ message: 'You forgot to enter your credentials!' });
  }
  
  if (password.length <= 2) {
    return next({ message: 'Please choose a longer password.. :-(' });
  }
  
  User.register(new User({ username }), password, (err, user) => {
    if (err && err.toString().includes('registered')) {
      return next({ message: 'Username taken' });
    }
    
    if (err) {
      return next({ message: 'Error during registration' });
    }
    
    const jwtoken = JWT.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { algorithm: 'HS256', expiresIn: '10h' }
    );
    
    res.cookie('jwt', jwtoken, { httpOnly: true });
    return res.json({
      success: true,
      message: 'Welcome to the Tower, Regular!'
    });
  });
});

router.get('/user-login', (req, res) => {
  return res.render('user-login');
});

router.post('/user-login', (req, res, next) => {
  passport.authenticate('user-local', (_, user, err) => {
    if (err) {
      return next({ message: 'Error during login' });
    }
    
    const jwtoken = JWT.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { algorithm: 'HS256', expiresIn: '10h' }
    );
    
    res.cookie('jwt', jwtoken, { httpOnly: true });
    return res.json({
      success: true,
      message: 'Welcome back to the Tower!'
    });
  })(req, res, next);
});

router.get('/user-logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
});

router.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    success: false,
    error: err.message || 'Invalid Request'
  });
});

module.exports = router;