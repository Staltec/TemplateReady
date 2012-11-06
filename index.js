#!/usr/bin/env node

var path = require("path"),
    args = process.argv.slice(1),
   templateready = require("./lib/templateready")
   ;

var arg, base;
do arg = args.shift();
while ( arg !== __filename
   && (base = path.basename(arg)) !== "ejscompiler"
   && base !== "ejscompiler.js"
)


templateready
   .addEngine(require('./compilers/underscore-ejs'))
   //.addEngine(require('./compilers/underscore-ejs'), /^.*\.(html?)$/)
   //.addEngine(require('./compilers/underscore-ejs'), /^.*\.(ejs)$/)
   .run(args);


// TODO: jade compiler