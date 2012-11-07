# Template Ready is template on the fly pre-compiler.


## templateready --help


    Usage:
      templateready [options]

    Options:
     -d|--dir <workDirectory>
       The work directory. Use as base path for source directory and output JS
       Default is '.'

     -s|--source <sourceDirectory>
       The source directory with templates.
       If set directory name without path then use work directory as base path: <workDirectory>/templates/
       If set directory name with path then use it as is.
       Default is 'templates'

     -f|--file <outputFile>
       The name of output script file.
       If set file name without path then use work directory as base path: <workDirectory>/templates.js
       If set file name with path then use it as is.
       Pre-comiler will generate common and minified versions of output files.
       Default is 'templates.js'

     -t|--target <targetJsObject>
       The name of object who contain pre-compiled temlates as methods.
       You must ensure that the object already declared in your JS application.
       Default is 'Core.Template'

     -w|--watch
       Watch for changes for source directory.
       When a change template file occurs, rebuild output js files
       No default

     -p|--poll-interval <milliseconds>
       How often to poll watched files for changes.
       Defaults to Node default.

     -h|--help|-?
       Display these usage instructions.

     -q|--quiet
       Suppress DEBUG messages

     -V|--version
       Show version and exit.

     Examples:
       templateready -d ./wwwroot/app -s mytemplates -w -p 1000
       templateready --source ./wwwroot/mytemplates --file ./wwwroot/app/comiled.js --target 'Application.Templates'


## Simple Install

Install npm, and then do this:

    npm install templateready -g

You don't even need to download or fork this repo at all.

## Fancy Install

Get this code, install npm, and then do this:

    npm link
