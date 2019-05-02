let stringHelper = {};


stringHelper.createRandomString = function (charCount) {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
	for (let i = 0; i < charCount; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
};


module.exports = stringHelper;