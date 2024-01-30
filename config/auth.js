module.exports = {
  //function that checks if the user is authenticated and good to view the content requested
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/users/login');
  },
  //function that will redirect an authenticated user
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  }
};
