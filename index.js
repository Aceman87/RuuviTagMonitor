const path = require('path');
global.gAppRoot = path.resolve(__dirname);

const fs = require('fs');
//const tags = require(global.gAppRoot + "/ruuvitags.json");
const ruuvi = require('node-ruuvitag');
var tags = readTagsFromFile(global.gAppRoot + "/ruuvitags.json");

//Search for tags and updated tag data
ruuvi.on('found', tag => {
	console.log('Found RuuviTag, id: ' + tag.id);

	//var tagIsOld = isOldTag(tag.id);
	if (!isOldTag(tag.id)) {
		console.log("Tag is new: " + tag.id);
		var tg = {"Id":tag.id,"Name":""};
		tags.push(tg);
		writeTagsToFile(global.gAppRoot + "/ruuvitags.json");
	}
	console.log(JSON.stringify(tags, null, '\t'));

	tag.on('updated', data => {
		//console.log('Got data from RuuviTag ' + tag.id + ':\n' + JSON.stringify(data, null, '\t'));
	});
});

//Read old tags from the file
function readTagsFromFile(path) {
	console.log("Reading old tags from file...");
	try {
		let rawdata = fs.readFileSync(path);  
		let tgs = JSON.parse(rawdata);
		return tgs;
	} catch(err) {
		console.log("No old tags file found at: " + path);
		console.error(err);
		console.log("Creating file: " + path);
		let newtgs = [];
		fs.writeFileSync(path, JSON.stringify(newtgs, null, '\t')); 
		return newtgs;
	}
}

//Check if the tag is already in the tags array
function isOldTag(tgId) {
	for (var index = 0; index < tags.length; ++index) {
		var tg = tags[index];
		if(tg.Id == tgId){
			return true;
		}
	}
	return false;
}

//Write new tags to the tags file
function writeTagsToFile(path) {
	fs.writeFileSync(path, JSON.stringify(tags, null, '\t'));
}
