# TemplateReady

TemplateReady is multi-templating on the fly pre-compiler.


## Why TemplateReady?
* Most common template libraries support.
* If rewrite template in another templating library - don't need to change client-side application code.
* Create common, minified and gzipped versions (useful with gzip_static Nginx module).
* include template library runtime code (if exists) into the output script file.


## Supported template libraries
* [Underscore](http://underscorejs.org/#template) template - builds client-side independent methods. Not even need Underscore.js!
* [Mustache](http://mustache.github.com/) - client-side [runtime](https://github.com/twitter/hogan.js/blob/master/web/builds/2.0.0/template-2.0.0.js) code required.
* [Jade](https://github.com/visionmedia/jade) - client-side [runtime](https://github.com/visionmedia/jade/blob/master/runtime.js) code required.


## Simple Install

Install npm, and then do this:

    npm install templateready -g

You don't even need to download or fork this repo at all.

## Fancy Install

Get this code, install npm, and then do this:

    npm link


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

      -r| --runtime
        Add template library runtime code (if exists) into the output script file.
        No default

     -w|--watch
       When a change template file occurs, rebuild output js file.
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
       templateready -d ./wwwroot/app --runtime
       templateready -d ./wwwroot/app -s mytemplates -w -p 1000
       templateready --source ./wwwroot/mytemplates --file ./wwwroot/app/comiled.js --target 'MyApplicationTemplates'


## Issues

Have a bug? Please create an issue here on GitHub!

https://github.com/Staltec/TemplateReady/issues


## Author

**Alexander Prozorov**

+ https://github.com/Staltec


## License
TemplateReady is released under the MIT license.