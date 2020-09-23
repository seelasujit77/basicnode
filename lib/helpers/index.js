'use strict';
/**
 * @description for helping functions
 * @author sujit seela
 * @since SEP 15, 2020
 */

//const _ = require('lodash'),
 const moment = require('moment'),
  path = require('path'),
  fs = require('fs'),
  //config = require('../../config');
 momenttime = require('moment-timezone');

module.exports = {
  /**
	 *@description Write Log Files
	 *@params String
	 *@params Array
	 *@return Boolean
	 *@author sujit seela
	 *@date 15/09/2020 
	 */
  logWriter: (data, filename, folderName, append) => {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    let logPath = module.exports.createLogFolder(folderName);
    logPath = logPath + filename + '.log';
    if (append) {
      var newData = '\n' + data;
      fs.appendFile(logPath, newData);
    } else {
      fs.writeFileSync(logPath, data);
    }
  },
  createLogFolder: folderName => {
    var currentDate = moment().format('DD-MM-YYYY');
    var logPathDir = path.join(__dirname, '../../LOGS');
    if (!fs.existsSync(logPathDir)) {
      fs.mkdirSync(logPathDir);
    }
    logPathDir = path.join(logPathDir + '/' + currentDate);
    if (!fs.existsSync(logPathDir)) {
      fs.mkdirSync(logPathDir);
    }
    logPathDir = path.join(logPathDir + '/' + folderName);
    if (!fs.existsSync(logPathDir)) {
      fs.mkdirSync(logPathDir);
    }
    return logPathDir + '/';
  },
  crashReport: (data, folderName) => {
    var currentDate = moment().format('DD-MM-YYYY HH:mm');
    var newData = "\n" + currentDate + "\t" + data;
    var logPath = module.exports.createLogFolder(folderName);
    logPath = logPath + folderName + '.log';
    fs.appendFile(logPath, newData, function (err, done) {
      if (err) console.log("error while writing " + folderName + " :", err);
      else
        console.log(folderName + " sucessfully writtend");
    });
  },
  // time converion from 24 hrs to 12 hrs 
  timeConversion: (time, lang) => {
    let st_time = time.split(":");
    if (st_time[0] > "12") {
      time = ((st_time[0] - 12) + ":" + st_time[1]) + ' ' + ((lang == 1) ? "مساءً" : "PM")
    } else if (st_time[0] == "12") {
      time = ((st_time[0]) + ":" + st_time[1]) + ' ' + ((lang == 1) ? "مساءً" : "PM")
    } else if (st_time[0] == "00") {
      time = ("12" + ":" + st_time[1]) + ' ' + ((lang == 1) ? "صباحًا" : "AM")
    } else {
      time = (time) + ' ' + ((lang == 1) ? "صباحًا" : "AM")
    }
    return time
  },
  roundNumber: x => {
      return (Math.round(x*1e2))/1e2;
  }
};
