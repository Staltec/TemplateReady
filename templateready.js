/**
 * User: Staltec
 * Date: 05.11.12
 * Time: 22:42
 */

var util = require("util");
var path = require("path");
var fs = require("fs");
var async = require("async");
var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;
var meta = require("./package.json");

var cfg = {},
    sourceDirRegExp,
    templateNames,
    alreadyWatched = {},
    compilers = [];

exports.addEngine = function(engine, forcePattern){
   if(engine && engine.filePattern instanceof RegExp && engine.compiler instanceof Function){
      if(forcePattern instanceof RegExp) engine.filePattern = forcePattern;
      compilers.push(engine);
      //util.puts('Plugin template engine: "'+(engine.name?engine.name:'Unknown')+'" with pattern: '+engine.filePattern);
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
      cfg.targetOject = "Core.Template";
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


var _requireSample = function (name){ return this._names[name] ? this[this._names[name]] : undefined };

function compileFiles (files){
   var hdr, buf = '';
   templateNames = {};

   async.map(files,
   function(f, cb){
      compileFile(f, cb);
   },
   function(err, res){
      hdr =  '// Assembled by TemplateReady '+meta.version+'\n';
      hdr += '// At '+new Date()+'\n\n';

      buf += cfg.targetOject+'._names = '+JSON.stringify(templateNames)+';\n\n';
      buf +=  cfg.targetOject+'.require = '+_requireSample.toString()+'\n\n';
      buf += res.join('\n\n');

      fs.writeFile(cfg.outFile+'.js', hdr + buf, 'utf8', function(err){
         if(err) util.error('\nCan`t write script file: "'+cfg.outFile+'.js"\n');
      });

      fs.writeFile(cfg.outFile+'.min.js', hdr + minifier(buf), 'utf8', function(err){
         if(err) util.error('\nCan`t write script file: "'+cfg.outFile+'.min.js"\n');
      });

      util.debug('save canges...');

   })
}


function getFuncName(file){
   var fileName =  file.replace(sourceDirRegExp,'');
   var funcName = fileName.replace(/\..+?$/,'').replace(/\/\w/g, function(t){return t.charAt(1).toUpperCase()});
   templateNames[fileName] = funcName;
   return funcName;
}


function compileFile (file, callback){
   var compiler;
   for(var i=0, l=compilers.length; i<l; i++){
      if(compilers[i].filePattern.test(file)){
         compiler = compilers[i].compiler;
         break;
      }
   }

   if(compiler){
     compiler({file:file}, function(err, funcCode){
        if(err){
           callback(err, '');
           util.error('Trouble with template file: ' + file);
        }else{
           callback(null, funcCode ? cfg.targetOject+'.'+getFuncName(file)+' = ' + funcCode : '');
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

      ("  -t|--target <targetJsObject>")
      ("    The name of object who contain pre-compiled temlates as methods.")
      ("    You must ensure that the object already declared in your JS application.")
      ("    Default is 'Core.Template'")
      ("")

      ("  -w|--watch")
      ("    Watch for changes for source directory.")
      ("    When a change template file occurs, rebuild output js files")
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
      ("  templateready -d ./wwwroot/app -s mytemplates -w -p 1000")
      ("  templateready --source ./wwwroot/mytemplates --file ./wwwroot/app/comiled.js --target 'Application.Templates'")
      ("");
}


