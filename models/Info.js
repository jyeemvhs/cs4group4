var mongoose = require("mongoose");

//Schema is a decription (the definition) of the mongoDB document.
var infoSchema = mongoose.Schema({
	name: {
		required: true,
		unique: true,		
		type:String
    },
	time: Number,
	best: Number
});

var Info = mongoose.model("Info", infoSchema);

module.exports = Info;

