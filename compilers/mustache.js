/**
 * User: Staltec
 * Date: 06.11.12
 * Time: 14:52
 */

var util = require("util")
  , fs = require("fs")
  , hogan = require("hogan.js")
  ;

module.exports = {};

module.exports.type = 'mustache';

module.exports.filePattern = /^.*\.(mustache)$/;

module.exports.runtime = fs.readFileSync(__dirname+'/hogan.template-2.0.0.min.js', 'utf8')+';';

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
