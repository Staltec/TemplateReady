#!/usr/bin/env node

var path = require("path"),
    args = process.argv.slice(1),
   templateready = require("./templateready")
   ;

var arg, base;
do arg = args.shift();
while ( arg !== __filename
   && (base = path.basename(arg)) !== "templateready"
   && base !== "templateready.js"
)

templateready
   .addEngine(require('./compilers/underscore-ejs'))
   .run(args);
