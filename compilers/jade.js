/**
 * User: Staltec
 * Date: 10.11.12
 * Time: 3:45
 */

var util = require("util")
  , fs = require("fs")
  , jade = require('jade')
  , jadeCopyright =  '/*!\n* Jade - runtime\n* Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>\n* MIT Licensed\n*/\n'
  ;


module.exports = {};

module.exports.type = 'jade';

module.exports.filePattern = /^.+\.jade$/;

module.exports.runtime = jadeCopyright+fs.readFileSync(__dirname+'/jade.runtime.min.js', 'utf8');

module.exports.compiler = function(options, callback){

   // Ignore includes
   //  *.include.jade
   //  */includes/*.jade
   //
   if(/\/includes\//.test(options.file) || /\.include/.test(options.file)) return callback(null);

   fs.readFile(options.file, 'utf8', function(err, fileContent){
      var code, cErr;

      if(err){
         callback(err, '');
      }else{
         try{
            code = jade.compile(fileContent, {
               filename : options.file,
               client : true,
               self: /self\./.test(fileContent),
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

