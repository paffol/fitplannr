const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('register'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/planner', ensureAuthenticated, (req, res) =>
  res.render('planner', {
    user: req.user
  })
);

router.get('/nutrition', ensureAuthenticated, (req, res) =>
  res.render('nutrition', {
    user: req.user
  })
);

router.get('/gyms', ensureAuthenticated, (req, res) =>
  res.render('gyms', {
    user: req.user
  })
);

router.get('/calendar', ensureAuthenticated, (req, res) =>
  res.render('calendar', {
    user: req.user
  })
);



module.exports = router;
