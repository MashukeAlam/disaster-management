function ensureAdmin(req, res, next) {
  console.log(req.isAuthenticated() , req.user);
  
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  req.flash('error_msg', 'Please log in to view this resource');
  res.redirect('/login');
}

module.exports = ensureAdmin;