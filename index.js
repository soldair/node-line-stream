var through2 = require('through2')
var os = require('os')
var empty = new Buffer(0)
module.exports = nihSplit

function nihSplit(delim){
  delim = delim||false
  var start = delim.start||0
  delim = new Buffer(delim.delimiter||delim||os.EOL)

  var out = through2.obj(function(buf,enc,cb){
    var offset = 0
    var i = 0
    
    if(!Buffer.isBuffer(buf)) buf = new Buffer(buf)
    if(this.fragment.length) {
      buf = Buffer.concat([this.fragment,buf])
      // make sure fragment won't be observed in an invalid state
      this.fragment = empty
    }
    
    while((i = buf.indexOf(delim,offset)) > -1){
      var b = buf.slice(offset,i+1)
      b.start = start+offset
      offset = i+1
      this.push(b)
    }
    
    this.fragment = buf.slice(offset)
    start += buf.length-this.fragment.length
    cb()
  },function(cb){
    if(this.fragment.length) {
      this.fragment.start = start
      this.emit('fragment',this.fragment)
    }
    cb()
  })

  out.fragment = empty

  return out
}

