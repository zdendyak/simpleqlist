var Qlist = require('../models/qlist');

module.exports.getAllQlists = function(req, res) {
	var user = req.user;
	//search qlist by users
	if (user.role === 'Admin' || user.role === 'Engineer') {
		Qlist.find({}, function (err, qlists) {
			if (err) {
				res.status(500).send({message: 'Вибачте, виникла помилка.'});
			} else {
				res.status(200).json(qlists);
			}
		});
	} else {
		Qlist.find({manager: user._id}, function (err, qlists) {
			if (err) {
				res.status(500).send({message: 'Вибачте, виникла помилка.'});
			} else {
				res.status(200).json(qlists);
			}
		});
	};
	
};

module.exports.addQlist = function(req, res) {
	var newQlist = new Qlist(req.body);
	

	//save to DB
	newQlist.save(function(err, qlist){
		if (err) {
			return res.send(err);
		};
		return res.send({message: "Дані збережено"});
	});
};

module.exports.updateQlist = function(req, res) {
	var id = req.body._id;

	Qlist.findById(id, function(err, qlist) {
		if (err) throw err;

		//update qlist
		Object.assign(qlist, req.body);
		//save to DB
		qlist.save(function(err, qlist){
			if (err) {
				return res.send(err);
			};
			return  res.send({message: "Дані оновлено"});
		});
	})
	

	
};

module.exports.getQlistById = function(req, res) {
	var id = req.params.id;
	Qlist.findOne({_id: id}, function (err, qlist) {
		if (err) {
			res.status(500).send({message: 'Вибачте, виникла помилка.'});
		} else {
			res.json(qlist);
		}
	});
};

module.exports.deleteQlistById = function(req, res) {
	var id = req.params.id;
	Qlist.findOneAndRemove({_id: id}, function (err) {
		if (err) {
			res.status(500).send({message: 'Вибачте, виникла помилка.'});
		} else {
			res.sendStatus(200);
		}
	});
};