// Assembled by Template Ready 0.0.2
// At Wed Nov 07 2012 04:06:54 GMT+0800 (KRAT)

Core.Template._names = {"test.ejs":"test","system/sampleOne.html":"systemSampleOne","system/test.htm":"systemTest"};

Core.Template.require = function (name){ return this._names[name] ? this[this._names[name]] : undefined }

Core.Template.test = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div>\r\n   <ol>\r\n   ';
 for(var i=0, l=items.length; i<l; i++){ 
__p+='\r\n      <li>'+
((__t=( items[i] ))==null?'':__t)+
'</li>\r\n   ';
 } 
__p+='\r\n   </ol>\r\n</div>';
}
return __p;
}

Core.Template.systemSampleOne = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<ul>\r\n  <p>23423423!!!!!!</p>\r\n   ad\r\n   sdafsdfs\r\n</ul>';
}
return __p;
}

Core.Template.systemTest = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div>\r\n   ';
 value 
__p+=' aaA!\r\n</div>';
}
return __p;
}