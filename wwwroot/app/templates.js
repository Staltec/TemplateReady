// Assembled by Template Ready 0.0.9
// At Thu Nov 08 2012 06:53:32 GMT+0800 (KRAT)

Core.Template._names = {"underscore/test.htm":"underscoreTest"};

Core.Template.require = function (name){ return this._names[name] ? this[this._names[name]] : undefined }

Core.Template.underscoreTest = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div>\r\n    <h1>'+
((__t=( title ))==null?'':__t)+
'</h1>\r\n\r\n    ';
 if(list.length){ 
__p+='\r\n    <ol>\r\n        ';
 for(var v, i=0, l=list.length; i<l; i++){ v = list[i]; 
__p+='\r\n        <li>'+
((__t=( v ))==null?'':__t)+
'</li>\r\n        ';
 } 
__p+='\r\n    </ol>\r\n    ';
 }else{ 
__p+='\r\n        Пустой список (не будет показан).\r\n    ';
 } 
__p+='\r\n\r\n    <h2>Дискография: '+
((__t=( hash.firstName ))==null?'':__t)+
' '+
((__t=( hash.lastName ))==null?'':__t)+
' '+
((__t=( hash.age ? '('+hash.age+')' : '' ))==null?'':__t)+
'</h2>\r\n\r\n    <ul>\r\n        ';
 for(var v, i=0, l=objList.length; i<l; i++){ v = objList[i]; 
__p+='\r\n        <li>'+
((__t=( v.year ))==null?'':__t)+
' &mdash; '+
((__t=( v.album ))==null?'':__t)+
'</li>\r\n        ';
 } 
__p+='\r\n    </ul>\r\n\r\n</div>';
}
return __p;
}