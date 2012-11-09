// Assembled by TemplateReady 0.2.0
// At Sat Nov 10 2012 07:19:06 GMT+0800 (KRAT)

var TemplateReady = {

underscoreTest: function(obj){
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
__p+='\r\n    </ul>\r\n</div>\r\n';
}
return __p;
},

mustacheTest_space: function(obj){return new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div>");_.b("\n" + i);_.b("    <h1>");_.b(_.v(_.f("title",c,p,0)));_.b("</h1>");_.b("\n" + i);_.b("\n" + i);_.b("    <ol>");_.b("\n" + i);if(_.s(_.f("list",c,p,1),c,p,0,52,80,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        <li>");_.b(_.v(_.d(".",c,p,0)));_.b("</li>");_.b("\n");});c.pop();}if(!_.s(_.f("list",c,p,1),c,p,1,0,0,"")){_.b("        <li>Пустой список (не будет показан).</li>");_.b("\n");};_.b("    </ol>");_.b("\n" + i);_.b("\n" + i);if(_.s(_.f("hash",c,p,1),c,p,0,193,277,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    <h2>Дискография: ");_.b(_.v(_.f("firstName",c,p,0)));_.b(" ");_.b(_.v(_.f("lastName",c,p,0)));_.b(" ");if(_.s(_.f("age",c,p,1),c,p,0,250,259,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("(");_.b(_.v(_.f("age",c,p,0)));_.b(")");});c.pop();}_.b("</h2>");_.b("\n");});c.pop();}_.b("\n" + i);_.b("    <ul>");_.b("\n" + i);if(_.s(_.f("objList",c,p,1),c,p,0,313,362,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        <li>");_.b(_.v(_.f("year",c,p,0)));_.b(" &mdash; ");_.b(_.v(_.f("album",c,p,0)));_.b("</li>");_.b("\n");});c.pop();}_.b("    </ul>");_.b("\n" + i);_.b("\n" + i);_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n");return _.fl();;}).render(obj)},

mustacheTest: function(obj){return new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div>");_.b("\n" + i);_.b("    <h1>");_.b(_.v(_.f("title",c,p,0)));_.b("</h1>");_.b("\n" + i);_.b("\n" + i);_.b("    <ol>");_.b("\n" + i);if(_.s(_.f("list",c,p,1),c,p,0,52,80,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        <li>");_.b(_.v(_.d(".",c,p,0)));_.b("</li>");_.b("\n");});c.pop();}if(!_.s(_.f("list",c,p,1),c,p,1,0,0,"")){_.b("        <li>Пустой список (не будет показан).</li>");_.b("\n");};_.b("    </ol>");_.b("\n" + i);_.b("\n" + i);if(_.s(_.f("hash",c,p,1),c,p,0,193,277,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    <h2>Дискография: ");_.b(_.v(_.f("firstName",c,p,0)));_.b(" ");_.b(_.v(_.f("lastName",c,p,0)));_.b(" ");if(_.s(_.f("age",c,p,1),c,p,0,250,259,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("(");_.b(_.v(_.f("age",c,p,0)));_.b(")");});c.pop();}_.b("</h2>");_.b("\n");});c.pop();}_.b("\n" + i);_.b("    <ul>");_.b("\n" + i);if(_.s(_.f("objList",c,p,1),c,p,0,313,362,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        <li>");_.b(_.v(_.f("year",c,p,0)));_.b(" &mdash; ");_.b(_.v(_.f("album",c,p,0)));_.b("</li>");_.b("\n");});c.pop();}_.b("    </ul>");_.b("\n" + i);_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n");return _.fl();;}).render(obj)},

jadeTest: function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div><h1>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h1></div><ol>');
if ( (list.length))
{
// iterate list
;(function(){
  if ('number' == typeof list.length) {

    for (var $index = 0, $$l = list.length; $index < $$l; $index++) {
      var item = list[$index];

buf.push('<li>');
var __val__ = item
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</li>');
    }

  } else {
    var $$l = 0;
    for (var $index in list) {
      $$l++;      var item = list[$index];

buf.push('<li>');
var __val__ = item
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</li>');
    }

  }
}).call(this);

}
else
{
buf.push('<li>Пустой список (не будет показан).</li>');
}
buf.push('</ol><h2>Дискография: ' + escape((interp = hash.firstName) == null ? '' : interp) + ' ' + escape((interp = hash.lastName) == null ? '' : interp) + ' ' + escape((interp = hash.age ? '\('+hash.age+'\)' : '') == null ? '' : interp) + '</h2><ul>');
// iterate objList
;(function(){
  if ('number' == typeof objList.length) {

    for (var $index = 0, $$l = objList.length; $index < $$l; $index++) {
      var item = objList[$index];

buf.push('<li>' + escape((interp = item.year) == null ? '' : interp) + ' &mdash; ' + escape((interp = item.album) == null ? '' : interp) + '</li>');
    }

  } else {
    var $$l = 0;
    for (var $index in objList) {
      $$l++;      var item = objList[$index];

buf.push('<li>' + escape((interp = item.year) == null ? '' : interp) + ' &mdash; ' + escape((interp = item.album) == null ? '' : interp) + '</li>');
    }

  }
}).call(this);

buf.push('</ul>');
}
return buf.join("");
},

_n: {"underscore/test.htm":"underscoreTest","mustache/test space.mustache":"mustacheTest_space","mustache/test.mustache":"mustacheTest","jade/test.jade":"jadeTest"},
require: function (n){ return this[this._n[n]] }
}

/**
* @preserve Copyright 2012 Twitter, Inc.
* @license http://www.apache.org/licenses/LICENSE-2.0.txt
*/
var Hogan={};(function(a,b){function i(a){return String(a===null||a===undefined?"":a)}function j(a){return a=i(a),h.test(a)?a.replace(c,"&amp;").replace(d,"&lt;").replace(e,"&gt;").replace(f,"&#39;").replace(g,"&quot;"):a}a.Template=function(a,c,d,e){this.r=a||this.r,this.c=d,this.options=e,this.text=c||"",this.buf=b?[]:""},a.Template.prototype={r:function(a,b,c){return""},v:j,t:i,render:function(b,c,d){return this.ri([b],c||{},d)},ri:function(a,b,c){return this.r(a,b,c)},rp:function(a,b,c,d){var e=c[a];return e?(this.c&&typeof e=="string"&&(e=this.c.compile(e,this.options)),e.ri(b,c,d)):""},rs:function(a,b,c){var d=a[a.length-1];if(!k(d)){c(a,b,this);return}for(var e=0;e<d.length;e++)a.push(d[e]),c(a,b,this),a.pop()},s:function(a,b,c,d,e,f,g){var h;return k(a)&&a.length===0?!1:(typeof a=="function"&&(a=this.ls(a,b,c,d,e,f,g)),h=a===""||!!a,!d&&h&&b&&b.push(typeof a=="object"?a:b[b.length-1]),h)},d:function(a,b,c,d){var e=a.split("."),f=this.f(e[0],b,c,d),g=null;if(a==="."&&k(b[b.length-2]))return b[b.length-1];for(var h=1;h<e.length;h++)f&&typeof f=="object"&&e[h]in f?(g=f,f=f[e[h]]):f="";return d&&!f?!1:(!d&&typeof f=="function"&&(b.push(g),f=this.lv(f,b,c),b.pop()),f)},f:function(a,b,c,d){var e=!1,f=null,g=!1;for(var h=b.length-1;h>=0;h--){f=b[h];if(f&&typeof f=="object"&&a in f){e=f[a],g=!0;break}}return g?(!d&&typeof e=="function"&&(e=this.lv(e,b,c)),e):d?!1:""},ho:function(a,b,c,d,e){var f=this.c,g=this.options;g.delimiters=e;var d=a.call(b,d);return d=d==null?String(d):d.toString(),this.b(f.compile(d,g).render(b,c)),!1},b:b?function(a){this.buf.push(a)}:function(a){this.buf+=a},fl:b?function(){var a=this.buf.join("");return this.buf=[],a}:function(){var a=this.buf;return this.buf="",a},ls:function(a,b,c,d,e,f,g){var h=b[b.length-1],i=null;if(!d&&this.c&&a.length>0)return this.ho(a,h,c,this.text.substring(e,f),g);i=a.call(h);if(typeof i=="function"){if(d)return!0;if(this.c)return this.ho(i,h,c,this.text.substring(e,f),g)}return i},lv:function(a,b,c){var d=b[b.length-1],e=a.call(d);if(typeof e=="function"){e=i(e.call(d));if(this.c&&~e.indexOf("{{"))return this.c.compile(e,this.options).render(d,c)}return i(e)}};var c=/&/g,d=/</g,e=/>/g,f=/\'/g,g=/\"/g,h=/[&<>\"\']/,k=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"}})(typeof exports!="undefined"?exports:Hogan);

/*!
* Jade - runtime
* Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
* MIT Licensed
*/
jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});

