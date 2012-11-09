/**
 * User: Staltec
 * Date: 06.11.12
 * Time: 14:52
 */

var util = require("util");
var fs = require("fs");
var _ = require('underscore');

module.exports = {};

module.exports.type = 'underscore';

module.exports.filePattern = /^.*\.(html?)$/;

module.exports.compiler = function(options, callback){

   fs.readFile(options.file, 'utf8', function(err, fileContent){
      var code, cErr;

      if(err){
         callback(err, '');
      }else{
         try{
            code = _.template(fileContent).source;
         }catch(e){
            //util.error('Error pre-compile template: ' + fileContent);
            cErr = e;
         }
         callback(cErr, code);
      }

   });
};
