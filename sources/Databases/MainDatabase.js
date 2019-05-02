
var mysql = require('mysql');


var mainDatabase = {};


mainDatabase.runQuery = function (query, params, callb) {
	connection.query(query, params, function (err, rows) {
		if (err) {
			console.log(" * * * err query: ", query);
			console.log(" * * * err params: ", params);
			console.log(" * * * err sql : ", this.sql);
			console.error(err.stack);
			//callb(undefined);
			return;
		}
		callb(rows);
	})
};

mainDatabase.runAsyncQuery = function (query, params) {
	return new Promise(function (resolve, reject) {
		connection.query(query, params, function (err, selectedRows, fields) {
			if (err) {
				console.log(" * * * * db error sql : ", this.sql);
				console.log(" * * * * db error ", err.stack);
				reject(err);
				throw err;
			} else {
				//connection.end();
				resolve(selectedRows);
			}
		});
	})
};

mainDatabase.selectOneAsync = async function (query, params) {
	const _rows = await mainDatabase.runAsyncQuery(query, params);
	return _rows[0];
};

mainDatabase.selectParameterValueAsync = async function (query, params) {
	const row = await mainDatabase.selectOneAsync(query, params);
	if (row === undefined) {
		return undefined;
	}
	const keys = Object.keys(row);
	if (keys.length === 0 || keys === undefined){
		return undefined;
	}
	
	const paramterKey = keys[0];
	return row[paramterKey];
};



mainDatabase.getDatabaseSettings = function () {
	return {
		host: 'localhost',
		user: 'local',
		password: '',
		database: 'coderhub',
		dateString: 'date'
	};
};



var connection;
function handleDisconnect() {
	console.log("* * * handleDisconn");
	connection = mysql.createConnection(mainDatabase.getDatabaseSettings());
	connection.on('error', function (err) {
		console.log("* * * db error");
		console.log(err);
		if (err.code == 'PROTOCOL_CONNECTION_LOST') {
			handleDisconnect();
		}
	});
}

handleDisconnect();

module.exports = mainDatabase;