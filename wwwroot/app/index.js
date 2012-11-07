/*
* Template ready test
*/

var Core = {

   Model: {},
   Collection: {},
   View: {},
   Template: {}, // <- target container for pre-compiled templates

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

   run: function(){
      // Underscore template engine
      Core.testFunc('underscoreTest');
      Core.testFile('underscore/test.htm');

   },

   testFunc: function(funcName, locals){
      if(!locals) locals = Core.testData;

      var html, err;
      try{
         html = Core.Template[funcName] ? Core.Template[funcName](locals) : (err=true, 'not found');
      }catch(e){
         err = true;
         html = e;
      }
      document.write('<span style="background-color:'+(err ? 'red' : 'green')+'">&nbsp;&nbsp;&nbsp;&nbsp;</span> <strong>Function "'+funcName+'"</strong>');
      document.write('<div style="padding:5px; margin-bottom:30px; border: 1px dashed #999999; background-color: #eeeeee">');
      document.write(html);
      document.write('</div>');
   },

   testFile: function(fileName, locals){
      if(!locals) locals = Core.testData;

      var html, err;
      try{
         html = Core.Template._names[fileName] ? Core.Template.require(fileName)(locals) : (err=true, 'not found');
      }catch(e){
         err = true;
         html = e;
      }
      document.write('<span style="background-color:'+(err ? 'red' : 'green')+'">&nbsp;&nbsp;&nbsp;&nbsp;</span> <strong>File "'+fileName+'"</strong>');
      document.write('<div style="padding:5px; margin:bottom:20px; border: 1px dashed #999999; background-color: #eeeeee">');
      document.write(html);
      document.write('</div>');
   }


};
