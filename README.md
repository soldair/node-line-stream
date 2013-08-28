node-line-stream
================

simple line parsing string emitting stream. tired of implementing line delimited streams ;)


i would probably use split by substack.

example
-------

```js
var linestream = require('line-stream');
var s = linestream();

s.on('data',function(line){
  console.log('line of data ',line);
})

fs.createReadStream(somefile).pipe(s);

```
