var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config/main');

function generateToken(user) {
	return jwt.sign(user, config.secret);
};

function setUserInfo(userData) {
	return {
		_id: userData._id,
		username: userData.username,
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email,
		role: userData.role
	};
};


module.exports.register = function(req, res, next) {
	if (!req.body.username || !req.body.password) {
		res.status(422).json({success: false, message: "Введіть логін і пароль"});
	} else {
		User.findOne({username: req.body.username}, function(err, user) {
			if (err) {
				return next(err);
			};

			if (user) {
				return res.status(422).send({success: false, message: "Користувач з таким логіном вже існує"});
			};

			var newUser = new User(req.body);

			newUser.save(function(err, user) {
				if (err) {
					res.json({success: false, message: "Виникла помилка при збареженні даних"})
					return next(err);
				};

				return res.json({success: true, message: "Ви успішно зареєструвалися"})
			});

		});
	};
};

module.exports.login = function(req, res) {
	User.findOne({username: req.body.username}, function(err, user) {
		if (err) throw err;

		if (!user) {
			res.send({success: false, message: "Користувач з таким іменем не знадений"});
		} else {
			user.comparePassword(req.body.password, function(err, isMatch) {
				if (isMatch && !err) {
					const userInfo = setUserInfo(user);

					res.status(200).json({
						success: true,
						token: 'JWT ' + generateToken(userInfo),
						user: userInfo
					});
				} else {
					res.send({success: false, message: "Невірний пароль"})
				}
			})
		}
	})

	
};