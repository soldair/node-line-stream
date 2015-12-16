var test = require('tape')
var split = require("../")

test("can split",function(t){

  t.plan(10)

  var s = split()

  var stage = 1
  var buf = []
  var all = []
  s.on('data',function(b){
    all.push(b)
    if(stage === 1) {
      
      buf.push(b)
      if(buf.length === 3){
        setImmediate(function(){
          t.equals(buf.length,3,'should have 3 items')
          t.equals(buf[0]+'','1\n','should include newlines')
          t.equals(buf[1].start,2,'should have correct start position ['+buf[1].start+']')
          t.equals(buf[2].start,buf[1].start+buf[1].length,'should have correct start offset calculated from previous ')

          t.equals(s.fragment+'','4','should have 4 in fragment')
          stage = 2
          buf = []
          s.write("\n5\n6\n7\n")
        })
      }
    } else if(stage === 2){
      buf.push(b)
      if(buf.length === 4){
        t.equals(buf[buf.length-1]+'','7\n','should have last line')
        // allow fragment to be set
        setImmediate(function(){
          t.equals(s.fragment.length,0,'should have empty fragment')

          stage = 3
          buf = []

          s.write('end fragment')

          s.end()
        })
      }
    }
  })

  s.on('fragment',function(f){
    t.equals(f+'','end fragment','should emit fragment')
    t.equals(f.start,14,'fragment start should be correct ')
    t.equals(Buffer.concat(all)+'',"1\n2\n3\n4\n5\n6\n7\n","should have emitted all data")
  })

  s.write("1\n2\n3\n4")
})


test("can end on delimiter")
