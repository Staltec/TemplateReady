/**
 * User: Staltec
 * Date: 10.11.12
 * Time: 3:45
 */

var util = require("util")
  , fs = require("fs")
  , jade = require('jade')
  ;


module.exports = {};

module.exports.type = 'jade';

module.exports.filePattern = /^.*\.(jade)$/;

module.exports.runtime = fs.readFileSync(__dirname+'/jade.runtime.min.js', 'utf8');

module.exports.compiler = function(options, callback){

   fs.readFile(options.file, 'utf8', function(err, fileContent){
      var code, cErr;

      if(err){
         callback(err, '');
      }else{
         try{
            code = jade.compile(fileContent, {
               filename : options.file,
               client : true,
               self: true,
               compileDebug : false
            }).toString();
            if(code) code = code.toString().replace('function anonymous', 'function');
         }catch(e){
            cErr = e;
         }
         callback(cErr, code);
      }

   });
};

