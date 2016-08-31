var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt =  require('bcryptjs');

var userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: String,
	lastName: String,
	phone: String,
	phone2: String,
	email: String,
	role: {
		type: String,
		enum: ['Manager', 'Engineer', 'Admin'],
		default: 'Manager'
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	}, 
	{
	timestamps: true
	});

userSchema.pre('save', function(next) {
	var user = this;
	const SALT_FACTOR = 10;

	if (user.isModified('password') || user.isNew) {
		bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
			if (err) return next(err);

			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return next(err);

				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);

		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', userSchema);