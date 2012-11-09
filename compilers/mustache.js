/**
 * User: Staltec
 * Date: 06.11.12
 * Time: 14:52
 */

var util = require("util");
var fs = require("fs");
var hogan = require("hogan.js");

module.exports = {};

module.exports.name = 'Mustache compiler';

module.exports.filePattern = /^.*\.(mustache)$/;

module.exports.compiler = function(options, callback){

   fs.readFile(options.file, 'utf8', function(err, fileContent){
      var code, cErr;

      if(err){
         callback(err, '');
      }else{
         try{
            code = hogan.compile(fileContent, {asString: true});
         }catch(e){
            cErr = e;
         }
         callback(cErr, !cErr ? 'function(obj){return new Hogan.Template('+code+').render(obj)}' : '');
      }

   });
};
