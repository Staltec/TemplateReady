// Assembled by TemplateReady 0.1.2
// At Fri Nov 09 2012 15:54:56 GMT+0800 (KRAT)

var TemplateReady = {};

TemplateReady._names = {"underscore/test.htm":"underscoreTest","mustache/test.mustache":"mustacheTest"};

TemplateReady.require = function (name){ return this[this._names[name]] }

TemplateReady.underscoreTest = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div>\r\n    <h1>'+
((__t=( title ))==null?'':__t)+
'</h1>\r\n\r\n    <ol>\r\n    ';
 if(list.length){ 
__p+='\r\n        ';
 for(var v, i=0, l=list.length; i<l; i++){ v = list[i]; 
__p+='\r\n        <li>'+
((__t=( v ))==null?'':__t)+
'</li>\r\n        ';
 } 
__p+='\r\n    ';
 }else{ 
__p+='\r\n        <li>Пустой список (не будет показан).</li>\r\n    ';
 } 
__p+='\r\n    </ol>\r\n\r\n    <h2>Дискография: '+
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
__p+='\r\n    </ul>\r\n</div>';
}
return __p;
}

TemplateReady.mustacheTest = function(obj){return new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div>");_.b("\n" + i);_.b("    <h1>");_.b(_.v(_.f("title",c,p,0)));_.b("</h1>");_.b("\n" + i);_.b("\n" + i);_.b("    <ol>");_.b("\n" + i);if(_.s(_.f("list",c,p,1),c,p,0,52,80,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        <li>");_.b(_.v(_.d(".",c,p,0)));_.b("</li>");_.b("\n");});c.pop();}if(!_.s(_.f("list",c,p,1),c,p,1,0,0,"")){_.b("        <li>Пустой список (не будет показан).</li>");_.b("\n");};_.b("    </ol>");_.b("\n" + i);_.b("\n" + i);if(_.s(_.f("hash",c,p,1),c,p,0,193,277,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    <h2>Дискография: ");_.b(_.v(_.f("firstName",c,p,0)));_.b(" ");_.b(_.v(_.f("lastName",c,p,0)));_.b(" ");if(_.s(_.f("age",c,p,1),c,p,0,250,259,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("(");_.b(_.v(_.f("age",c,p,0)));_.b(")");});c.pop();}_.b("</h2>");_.b("\n");});c.pop();}_.b("\n" + i);_.b("    <ul>");_.b("\n" + i);if(_.s(_.f("objList",c,p,1),c,p,0,313,362,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        <li>");_.b(_.v(_.f("year",c,p,0)));_.b(" &mdash; ");_.b(_.v(_.f("album",c,p,0)));_.b("</li>");_.b("\n");});c.pop();}_.b("    </ul>");_.b("\n" + i);_.b("\n" + i);_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n");return _.fl();;}).render(obj)};