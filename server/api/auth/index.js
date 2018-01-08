const router = require('express').Router()
const User = require('../../db/models/User')



// check currently-authenticated user, i.e. "who am I?"
router.get('/me', function (req, res, next) {
  res.json(req.session.user)
  // with Passport:
  // res.send(req.user);
  // // before, without Passport:
  // User.findById(req.session.user)
  // .then(user => res.json(user))
  // .catch(next);
});


// signup, i.e. "let `me` introduce myself"
router.post('/signup', function (req, res, next) {
  User.create(req.body)
  .then(user => {
    req.session.user = user
    res.json(user)
  })
  .catch(next)
});



// login, i.e. "you remember `me`, right?"
router.put('/login', function (req, res, next) {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    } // email and password
  })
  .then(user => {
    if (!user) {
      res.sendStatus(401); // no message; good practice to omit why auth fails
    } else {
      // with Passport:
      // req.logIn(user, function (err) {
      //   if (err) return next(err);
      //   res.json(user);
      // });
      // // before, without Passport:
      req.session.user = user;
      res.json(user);
    }
  })
  .catch(next);
});

// logout, i.e. "please just forget `me`"
router.delete('/', function (req, res, next) {
  // with Passport
  // req.logOut();
  // // before, without Passport
  req.session.destroy();
  res.sendStatus(204);
});

module.exports = router;

