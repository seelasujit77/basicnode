
var poolModule = require('generic-pool');
var mysql = require('mysql');
var Pool = (function () {
	var pool = null; 
	const factory = {
        create : function(){
            return new Promise(function(resolve, reject){
                  var client = mysql.createConnection({
                    "host": "xemplardrive-mysql.chva2y3irqo0.us-east-1.rds.amazonaws.com",
                    "user": "xemplardrive",
                    "password": "xemplarrds23",
                    "database": "fleetdrivedev",
                    "maxConnections": 100,
                    "minConnections": 10,
                    "idleTimeoutMillis": 30000
                });
                        client.connect(function (error) 
                        {
                            			if (error) {
                                            console.log('error in db', error);
                                            reject(error)
                                        }
                                        else
                                        {
                                            console.log("db connected");
                                            resolve(client)
                                        }	
                        });
              
              
            })
          },
        destroy:function(resource){
            return new Promise(function(resolve, reject){
                console.log("db connection closed");
              resolve(resource)
            })
          }
      }
	const config = {
        max: 4,
        min: 2
      }
	pool = poolModule.createPool(factory, config)
	
	return {
		getPool: function () {
           // console.log("my connection :: " +JSON.stringify(pool));
			return pool;
		}

	}
})()
module.exports = Pool;
