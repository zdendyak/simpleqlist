var mongoose = require('mongoose');

var qlistSchema = new mongoose.Schema({
	client: {
		name: String,
		phone: String,
		contactPerson: String,
		adress: String,
		email: String
	},

	manager: String,
	date: {type: Date, default: Date.now},

	coldRoom: {
		exist: Boolean,
		len: String, 
		width: String, 
		height: String,
		
		wall: {
			material: String,
			matThick: String,
			isolation: String,
			isolThick: String
		},
		ceil: {
			material: String,
			matThick: String,
			isolation: String,
			isolThick: String
		},
		floor: {
			material: String,
			matThick: String,
			isolation: String,
			isolThick: String
		},
		
		calcIsolation: Boolean,
		calcFloor: Boolean,
		
		doorHeight: String,
		doorWidth: String,
		doorType: String,

		productName: String,
		fullWeight: String,
		dailyWeight: String,
		startTemp: String,
		finishTemp: String,
		coolingTime: String,

		description: String,
		file: String
	},

	offers: [{
		number: Number,
		date: Date,
		file: String,
		description: String
	}]
});

qlistSchema.methods.addOffer = function(offer) {
		this.offer.push(offer);
	};


module.exports = mongoose.model('Qlist', qlistSchema);