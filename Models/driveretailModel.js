var spexecutor = require('./spexecutor');
var iso = require('iso-3166-2');
var sortJson = require('sort-json');
var domain = require('domain');

var driveModel = {
    
    getCountries: function (sp_params, callback) {
        spexecutor.execute('get_countries', sp_params, callback);
    },
    getStates: function (sp_params, callback) {
        console.log(sp_params)
        if (callback && typeof callback != 'function') {
            throw new Error('callback is not a function');
        }

        function exceptionHandler(err) {
            return callback(err, null);
        };
        var d = domain.create();
        d.on('error', exceptionHandler);
        d.run(function () {
            var countryCode = sp_params[0]; // get countryCode req.headers.countrycode;
            if (countryCode === null || countryCode === undefined) {
                var result = {
                    'success': '0',
                    'message': 'Invalid parameters sent.'
                };
                return callback(result);
            } else {
                var states = [];
                var rawStates = sortJson(iso.country(countryCode));
                if (rawStates.sub) {
                    Object.keys(rawStates.sub).forEach(function (key) {
                        var obj = {
                            'statecode': key.split('-')[1],
                            'statename': rawStates.sub[key].name
                        };
                        states.push(obj);
                    });
                }

                var obj = {
                    'success': '1',
                    'statesList': states
                };
                callback(null, obj);
            }
        });
    },
    executeModel: function (params, spname, cb) {
		if (params && params.constructor === Array && spname && typeof spname === 'string') {
			var options = {};
			options["spname"] = spname;
			spexecutor.execute(spname, params, cb);
		} else {
			return cb(new Error('Sp execution failded,due to wrong parameter or spname.'));
		}
	}
}

module.exports = driveModel;