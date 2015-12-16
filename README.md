line-stream
===========

split/binary-split but lines contain byte offset in the source stream and gives access to last line fragment

- this module leaves the delimiter on the resulting buffer.
- all values are cast to buffers and emitted as buffers.
- this module is just as fast as binary-split.


```js
var linestream = require('line-stream');
var s = linestream();

s.on('data',function(line){
  console.log('line of data ',line+'');
  console.log('i come from ',line.start,'byte offset in the file')
})

fs.createReadStream(somefile).pipe(s);

```


api
---

### var linestream = require('line-stream');
  - transform stream (through2)

### linestream(delimiter) || linestream({delimiter:os.EOL,start:0})
  - returns transform stream.
  - options
    - delimiter, defaults to os.EOL but can be anything
    - start, defaults to 0. this is an offset applied to the start property of each line's "line.start" property. just helpful.

### stream
  - **properties**
    - stream.fragment, at any time this property contains the fragment of the last incomplete line or an empty buffer.
  - **events**, 
    in addition to standard stream events this module also emits
    - fragment, 
     emits before end if there is a line fragment in the fragment property.
     


