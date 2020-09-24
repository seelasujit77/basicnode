
var poolConstructor = require('./../Models');
var pool = poolConstructor.getPool();
//const {logWriter} = require ('../lib/helpers');
module.exports = {
	execute: function (spname, spparameters, cb) {
		const resourcePromise = pool.acquire();
		resourcePromise.then(function(conn) {

			var stringize = 'Call ' + spname + '(?)';
			conn.query(stringize, [spparameters], function (er, results, fields) {
				console.log('trace', 'spname : ' + spname, 'userParams : ', spparameters, 'er : ', er);
				if (er) {
					pool.release(conn);
					if (cb && typeof cb === 'function') {
						return cb(er);
					} else {
						throw new Error('Error!!! executing sp : ' + spname + ' : ' + er.message + ' : callback is not a function');
					}
				}
				//add logger here for api
				if (cb && typeof cb === 'function') {
					pool.release(conn);
					return cb(er, results, fields);
				} else {
					pool.release(conn);
					throw new Error('callback is not a function');
				}
			});
			
		  })
		  .catch(function(err) {
			cb(err);
		  });
		
	},
	
};