
const logger = require('../lib/helpers');
const moment = require('moment');
const {logWriter} = require ('../lib/helpers');
const drive = require('./../Models/driveretailModel');

module.exports = {

    baseTest:(req,res)=>{
        let time = moment().format('HH MM SS');
        logWriter({data:"sample test"}, time+"req", 'Base Test');
        res.render('index', { title: 'SAMPLE DRIVE RETAIL' });
    },
    getStates:(req,res)=>{
        let time = moment().format('HH MM SS');
        logWriter({data:"get states test"}, time+"req", 'getStates');
        console.log("my log",req.headers.countrycode)
        var data=req.headers.countrycode
        drive.getStates([data], function (err, results) {
            if (err) {
                return next(err);
            } else {
                return res.json(results);
            }
        });
        
    },
    getCountries:(req,res)=>{

        let time = moment().format('HH MM SS');
        logWriter({data:"get countries test"}, time+"req", 'getCountries');
        drive.getCountries([],(err,results)=>{
            if (err) {
                return next(err);
            } else {
                var resultSetLength = results.length - 2;
                var result = {
                    'success': results[resultSetLength][0].code,
                    'message': results[resultSetLength][0].message
                };
                if (result.success == 1) {
                    result['countriesList'] = results[0];
                }
                logWriter(result, time+"res", 'getCountries');
                return res.json(result);
            }
        })
    },
    getmasterData:(req,res)=>{
        var type = req.query.type || null;
        drive.executeModel([type], "get_master_data", function (err, results) {
            if (err || results == undefined) {
               return res.json({
                    "success": "0",
                    "message": err
                });
            }
            else
            {

            return res.send({ success: "1", message: "User data fecthed successfully", masterData: results[0], amount: results[1] });
        }});

    },
    accountSetUp:(req,res)=>{

    }
   

};
