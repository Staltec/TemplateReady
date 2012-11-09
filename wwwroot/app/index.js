/*
* Template ready test
*/

   var testData = {
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
   }

   function runTests (){
      Template = TemplateReady;

      // Underscore template engine
      testFunc('underscoreTest');
      testFile('underscore/test.htm');

      // Mustache template engine
      testFunc('mustacheTest');
      testFile('mustache/test.mustache');

      // Mustache template with space in filename
      testFunc('mustacheTest_space');
      testFile('mustache/test space.mustache');

      // Jade template
      testFunc('jadeTest');
      testFile('jade/test.jade');

   }

   /* ----------------------------------------------- */

   var Template, counter = 0;

   function testFunc(funcName, locals){
      counter++;
      if(!locals) locals = testData;

      var html, err;
      try{
         html = Template[funcName] ? Template[funcName](locals) : (err=true, 'not found');
      }catch(e){
         err = true;
         html = e;
         console.log(e);
      }

      var sb = document.getElementById('statusBar');
      sb.innerHTML += '<a href="#'+counter+'" style="text-decoration:none; background-color:'+(err ? 'red' : 'green')+'">&nbsp;&nbsp;&nbsp;&nbsp;</a>&nbsp;';

      var tests = document.getElementById('tests');
      tests.innerHTML +='<span id="'+counter+'" style="background-color:'+(err ? 'red' : 'green')+'">&nbsp;&nbsp;&nbsp;&nbsp;</span> <strong>Function "'+funcName+'"</strong>';
      tests.innerHTML +='<div style="padding:5px; margin-bottom:30px; border: 1px dashed #999999; background-color: #eeeeee">'+html+'</div>';
   }

   function testFile(fileName, locals){
      counter++;
      if(!locals) locals = testData;

      var html, err, f;
      try{
         f = Template.require(fileName);
         html = f ? f(locals) : (err=true, 'not found');
      }catch(e){
         err = true;
         html = e;
      }

      var sb = document.getElementById('statusBar');
      sb.innerHTML += '<a href="#'+counter+'" style="text-decoration:none; background-color:'+(err ? 'red' : 'green')+'">&nbsp;&nbsp;&nbsp;&nbsp;</a>&nbsp;';

      var tests = document.getElementById('tests');
      tests.innerHTML += '<span id="'+counter+'" style="background-color:'+(err ? 'red' : 'green')+'">&nbsp;&nbsp;&nbsp;&nbsp;</span> <strong>File "'+fileName+'"</strong>';
      tests.innerHTML += '<div style="padding:5px; margin-bottom:30px; border: 1px dashed #999999; background-color: #eeeeee">'+html+'</div>';
   }
   
