/**
 * User: Staltec
 * Date: 06.11.12
 * Time: 14:52
 */

var util = require("util");
var _ = require('underscore');

module.exports = {
   name: 'Underscore-template compiler',

   filePattern: /^.*\.(html?)$/,

   compiler: function(str){
      var code;
      try{
         code = _.template(str).source;
      }catch(e){
         util.error('Error pre-compile template: ' + str);
      }
      return code;
   }

};
