var express = require('express');


module.exports = function(passport) {

	var router = express.Router();

	requireAuth = passport.authenticate('jwt', { session: false });

	var qlistController = require('../controllers/qlist-server-controller');
	var userController = require('../controllers/users-controller');

	router.get('/qlists', requireAuth, qlistController.getAllQlists);

	router.get('/qlist/:id', requireAuth, qlistController.getQlistById);

	router.delete('/qlist/:id', requireAuth, qlistController.deleteQlistById);

	router.post('/qlist', requireAuth, qlistController.addQlist);

	router.put('/qlist', requireAuth, qlistController.updateQlist);

	router.get('/users', requireAuth, userController.getAllUsers);

	router.get('/user/:username', requireAuth, userController.getUserByUsername);

	router.get('/profile', requireAuth, userController.getFullUserData);

	router.put('/profile', requireAuth, userController.updateProfile);

	return router;
}