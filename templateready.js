/**
 * User: Staltec
 * Date: 05.11.12
 * Time: 22:42
 */

var util = require("util")
  , path = require("path")
  , fs = require("fs")
  , async = require("async")
  , jsp = require("uglify-js").parser
  , pro = require("uglify-js").uglify
  , zlib = require('zlib')
  , meta = require("./package.json");

var cfg = {}
  , sourceDirRegExp
  , templateNames
  , runtimeCode
  , alreadyWatched = {}
  , compilers = [];

exports.addEngine = function(engine, forcePattern){
   if(engine && engine.filePattern instanceof RegExp && engine.compiler instanceof Function){
      if(forcePattern instanceof RegExp) engine.filePattern = forcePattern;
      compilers.push(engine);
   }
   return this;
};

exports.run = function (args){
   var arg;

   if(!args.length) return help();

   var nodeVersion = process.version.split(".");
   cfg.isWindowsWithoutWatchFile = process.platform === 'win32' && parseInt(nodeVersion[1]) <= 6;
   cfg.poll_interval = 100;

   while (arg = args.shift()) {
      if(arg === "--help" || arg === "-h" || arg === "-?"){
         return help();
      } else if(arg === "--version" || arg === "-V"){
          return console.log('templateready version: '+meta.version);
      } else if(arg === "--watch" || arg === "-w"){
         cfg.watch = true;
      } else if(arg === "--runtime" || arg === "-r"){
         cfg.runtime = true;
      } else if(arg === "--dir" || arg === "-d"){
         cfg.workDir = args.shift();
      } else if(arg === "--file" || arg === "-f"){
         cfg.outFile = args.shift();
      } else if(arg === "--source" || arg === "-s"){
         cfg.sourceDir = args.shift();
      } else if(arg === "--target" || arg === "-t"){
         cfg.targetOject = args.shift();
      } else if (arg === "--poll-interval" || arg === "-p") {
         cfg.poll_interval = parseInt(args.shift());
      } else if (arg === "--quiet" || arg === "-q") {
         cfg.debug = false;
         util.debug = function(){};
         util.puts = function(){};
      }
   }

   if(!cfg.workDir){
      cfg.workDir = ".";
   }
   cfg.workDir = path.resolve(cfg.workDir);

   if(!cfg.outFile){
      cfg.outFile = cfg.workDir+"/templates";
   }else{
      if(!/\//.test(cfg.outFile)){
         cfg.outFile = cfg.workDir+"/"+cfg.outFile;
      }
   }
   cfg.outFile = cfg.outFile.replace(/\.js$/,'');

   if(!cfg.sourceDir){
      cfg.sourceDir = cfg.workDir+"/templates";
   }else{
      if(!/\//.test(cfg.sourceDir)){
         cfg.sourceDir = cfg.workDir+"/"+cfg.sourceDir;
      }
   }
   cfg.sourceDir = path.resolve(cfg.sourceDir);
   sourceDirRegExp = new RegExp('^'+cfg.sourceDir+'\/?');

   if(!cfg.targetOject){
      cfg.targetOject = "TemplateReady";
   }

   getWatchedFiles(cfg.sourceDir);

   return true;
};


function getWatchedFiles (dir, state){
   dir = path.resolve(dir);

   if(!state) state = {
      files: [],
      entropia: 0
   };

   state.entropia++;
   fs.stat(dir, function(err, stats){
      state.entropia--;
      if (err) {
         util.error('\nError retrieving stats for file: ' + dir+'\n');
      } else {
         if (stats.isDirectory()){
            if(cfg.isWindowsWithoutWatchFile) watchGivenFile(dir);
            state.entropia++;
            fs.readdir(dir, function(err, fileNames) {
               state.entropia--;
               if(err) {
                  util.error('\nError reading path: ' + dir+'\n');
               }
               else {
                  fileNames.forEach(function (fileName) {
                     getWatchedFiles(path.join(dir, fileName), state);
                  });
               }
               if(state.entropia<1) compileFiles(state.files);
            });
         }else{
            state.files.push(dir);
            if(state.entropia<1) compileFiles(state.files);
         }
      }
   });
}


function minifier(code){
    var ast = jsp.parse(code); // parse code and get the initial AST
    ast = pro.ast_mangle(ast); // get a new AST with mangled names
    ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
    return pro.gen_code(ast); // compressed code here
}


var _requireSample = function (n){ return this[this._n[n]] };

function compileFiles (files){
   var hdr, buf = '';
   templateNames = {};
   runtimeCode = {};

   async.map(files,
   function(f, cb){
      compileFile(f, cb);
   },
   function(err, res){
      hdr =  '// Assembled by TemplateReady '+meta.version+'\n';
      hdr += '// At '+new Date()+'\n\n';

      buf += 'var '+cfg.targetOject+' = {\n\n';
      buf += res.join('\n\n')+'\n\n';
      buf += '_n: '+JSON.stringify(templateNames)+',\n';
      buf +=  'require: '+_requireSample.toString()+'\n';
      buf += '}\n\n';

      for(var key in runtimeCode) if (runtimeCode.hasOwnProperty(key)) {
         buf += runtimeCode[key]+'\n\n';
      }

      // Save common JS file
      saveToFile(cfg.outFile+'.js', hdr + buf);

      // Save minified  JS file
      buf = minifier(buf);
      saveToFile(cfg.outFile+'.min.js', buf);

      // Save compressed  JS file
      zlib.gzip(buf, function(err, result){
         saveToFile(cfg.outFile+'.min.js.gz', result);
      });

      util.debug('save canges...');

   })
}

function saveToFile(name, data){
   fs.writeFile(name, data, 'utf8', function(err){
      if(err) util.error('\nCan`t write script file: "'+name+'"\n');
   });
}


function getFuncName(file){
   var fileName =  file.replace(sourceDirRegExp,'');
   var funcName = fileName.replace(/ /g,'_').replace(/\..+?$/,'').replace(/\/\w/g, function(t){return t.charAt(1).toUpperCase()});
   templateNames[fileName] = funcName;
   return funcName;
}


function compileFile (file, callback){
   var engine;
   for(var i=0, l=compilers.length; i<l; i++){
      if(compilers[i].filePattern.test(file)){
         engine = compilers[i];
         break;
      }
   }

   if(engine && engine.compiler){
      engine.compiler({file:file}, function(err, funcCode){
        if(err){
           callback(err, '');
           util.error('Trouble with template file: ' + file + ' > '+ err);
        }else{
           // get runtime code if exists
           if(cfg.runtime && engine.type && engine.runtime) runtimeCode[engine.type] = engine.runtime;

           //  return template code
           callback(null, funcCode ? getFuncName(file)+': ' + funcCode + ',' : '');
        }
        if(!cfg.isWindowsWithoutWatchFile) watchGivenFile(file);
     });

   }else{
      callback(null, '');
   }

}


function watchGivenFile (file){

   if(cfg.watch && !alreadyWatched[file]){
      alreadyWatched[file] = true;

      if(cfg.isWindowsWithoutWatchFile){
         fs.watch(file, { persistent: true, interval: cfg.poll_interval }, onChangeWin);
      }else{
         fs.watchFile(file, { persistent: true, interval: cfg.poll_interval }, onChangeOther);
      }
   }

}


function onChangeWin(event, filename){
   if( event === 'change' && filename) {
      getWatchedFiles(cfg.sourceDir);
   }
}


function onChangeOther(oldStat, newStat){
   if ( newStat.mtime.getTime() !== oldStat.mtime.getTime() ) {
      getWatchedFiles(cfg.sourceDir);
   }
}


function help (){
   function print (m, n) { util.print(m+(!n?"\n":"")); return print; }

   print
      ("")
      ("Template Ready is template on the fly pre-compiler.")
      ("")
      ("Usage:")
      ("  templateready [options]")

      ("")
      ("Options:")
      ("  -d|--dir <workDirectory>")
      ("    The work directory. Use as base path for source directory and output JS")
      ("    Default is '.'")
      ("")

      ("  -s|--source <sourceDirectory>")
      ("    The source directory with templates.")
      ("    If set directory name without path then use work directory as base path: <workDirectory>/templates/")
      ("    If set directory name with path then use it as is.")
      ("    Default is 'templates'")
      ("")

      ("  -f|--file <outputFile>")
      ("    The name of output script file.")
      ("    If set file name without path then use work directory as base path: <workDirectory>/templates.js")
      ("    If set file name with path then use it as is.")
      ("    Pre-comiler will generate common and minified versions of output files.")
      ("    Default is 'templates.js'")
      ("")

      ("  -t| --target <targetVariable>")
      ("    Name of the global object containing templates.")
      ("    Default is 'TemplateReady'")
      ("")

      ("  -r| --runtime")
      ("    Add template library runtime code (if exists) into the output script file.")
      ("    No default")
      ("")

      ("  -w|--watch")
      ("    When a change template file occurs, rebuild output js file.")
      ("    No default")
      ("")

      ("  -p|--poll-interval <milliseconds>")
      ("    How often to poll watched files for changes.")
      ("    Defaults to Node default.")
      ("")

      ("  -h|--help|-?")
      ("    Display these usage instructions.")
      ("")
      ("  -q|--quiet")
      ("    Suppress DEBUG messages")
      ("")

      ("  -V|--version")
      ("    Show version and exit.")
      ("")

      ("Examples:")
      ("  templateready -d ./wwwroot/app --runtime")
      ("  templateready -d ./wwwroot/app -s mytemplates -w -p 1000")
      ("  templateready --source ./wwwroot/mytemplates --file ./wwwroot/app/comiled.js --target 'MyApplicationTemplates'")
      ("");
}


