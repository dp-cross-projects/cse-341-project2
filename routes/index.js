const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/inventory', require('./inventoryRoute'));
router.use('/customer', require('./customerRoute'));
router.use('/transaction', require('./transactionRoute'));
router.use('/purchase', require('./purchaseRoute'));
router.use('/user', require('./userRoute'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
