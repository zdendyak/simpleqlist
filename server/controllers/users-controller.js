var User = require('../models/user');

module.exports.getAllUsers = function(req, res) {

	User.find({}, function (err, users) {
		if (err) {
			res.status(500).send({message: 'Вибачте, виникла помилка.'});
		} else {
			var data = [];
			users.forEach(function(user) {
				var userData = {
					id: user._id,
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					phone: user.phone,
					phone2: user.phone2,
					email: user.email,
					role: user.role
				};
				data.push(userData);
			})
			res.status(200).json(data);
		}
	});
};

module.exports.getUserByUsername = function(req, res) {
	var username = req.params.username;
	User.findOne({username: username}, function (err, user) {
		if (err) {
			res.status(500).send({message: 'Вибачте, виникла помилка.'});
		} else {
			var userData = {
					id: user._id,
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					phone: user.phone,
					phone2: user.phone2,
					email: user.email,
					role: user.role
				};
			res.status(200).json(userData);
		}
	});
};

module.exports.getFullUserData = function(req, res) {
	var id = req.user._id;
	User.findOne({_id: id}, function (err, user) {
		if (err) {
			res.status(500).send({message: 'Вибачте, виникла помилка.'});
		} else {
			res.status(200).json(user);
		}
	});
};

module.exports.updateProfile = function(req, res) {
	var id = req.user._id;
	User.findOne({_id: id}, function (err, user) {
		if (err) {
			res.status(500).send({message: 'Вибачте, виникла помилка.'});
		} else {
			user.firstName = req.body.firstName;
			user.lastName = req.body.lastName;
			user.phone = req.body.phone;
			user.phone2 = req.body.phone2;
			user.email = req.body.email;
			user.save(function(err, user) {
				if (err) {
					res.status(500).send({message: 'Вибачте, виникла помилка.'});
				} else {
					res.status(200).json(user);
				};
			});
		};
	});
};

module.exports.setRoleEngineer = function(req, res) {
	if (req.user.role === 'Admin') {
		//set role
	}
};