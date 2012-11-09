/*
* Template ready test
*/

var Core = {

   Model: {},
   Collection: {},
   View: {},
   Template: {},

   testData: {
      title:'Тестовый заголовок',
      list: ['Один', 'Два', 'Три'],
      hash: {firstName:'Майкл', lastName:'Джексон', age:'RIP'},
      objList: [
         { year: 1972, album: "«Got to Be There»" },
         { year: 1972, album: "«Ben»" },
         { year: 1973, album: "«Music & Me»" },
         { year: 1975, album: "«Forever, Michael»" },
         { year: 1979, album: "«Off the Wall»" },
         { year: 1982, album: "«Thriller»" }
      ]
   },

   runTests: function(){
      Core.Template = TemplateReady;

      // Underscore template engine
      Core.testFunc('underscoreTest');
      Core.testFile('underscore/test.htm');

      // Mustache template engine
      Core.testFunc('mustacheTest');
      Core.testFile('mustache/test.mustache');

      // Mustache template with space in filename
      Core.testFunc('mustacheTest_space');
      Core.testFile('mustache/test space.mustache');

   },

   /* ----------------------------------------------- */

   testFunc: function(funcName, locals){
      Core.counter = 1+Core.counter || 0;
      if(!locals) locals = Core.testData;

      var html, err;
      try{
         html = Core.Template[funcName] ? Core.Template[funcName](locals) : (err=true, 'not found');
      }catch(e){
         err = true;
         html = e;
         console.log(e);
      }

      var sb = document.getElementById('statusBar');
      sb.innerHTML += '<a href="#'+Core.counter+'" style="text-decoration:none; background-color:'+(err ? 'red' : 'green')+'">&nbsp;&nbsp;&nbsp;&nbsp;</a>&nbsp;';

      var tests = document.getElementById('tests');
      tests.innerHTML +='<span id="'+Core.counter+'" style="background-color:'+(err ? 'red' : 'green')+'">&nbsp;&nbsp;&nbsp;&nbsp;</span> <strong>Function "'+funcName+'"</strong>';
      tests.innerHTML +='<div style="padding:5px; margin-bottom:30px; border: 1px dashed #999999; background-color: #eeeeee">'+html+'</div>';
   },

   testFile: function(fileName, locals){
      Core.counter = 1+Core.counter || 0;
      if(!locals) locals = Core.testData;

      var sb = document.getElementById('statusBar');
      sb.innerHTML += '<a href="#'+Core.counter+'" style="text-decoration:none; background-color:'+(err ? 'red' : 'green')+'">&nbsp;&nbsp;&nbsp;&nbsp;</a>&nbsp;';

      var html, err;
      try{
         html = Core.Template._names[fileName] ? Core.Template.require(fileName)(locals) : (err=true, 'not found');
      }catch(e){
         err = true;
         html = e;
      }

      var tests = document.getElementById('tests');
      tests.innerHTML += '<span id="'+Core.counter+'" style="background-color:'+(err ? 'red' : 'green')+'">&nbsp;&nbsp;&nbsp;&nbsp;</span> <strong>File "'+fileName+'"</strong>';
      tests.innerHTML += '<div style="padding:5px; margin-bottom:30px; border: 1px dashed #999999; background-color: #eeeeee">'+html+'</div>';
   }

};
