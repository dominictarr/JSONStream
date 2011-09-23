
var Parser = require('jsonparse')
  , Stream = require('stream').Stream

/*

  the value of this.stack that creationix's jsonparse has is weird.
  
  it makes this code ugly, but his problem is way harder that mine,
  so i'll forgive him.
  
  

*/

exports.parse = function (path) {
  
  var stream = new Stream()
  var parser = new Parser()
  var count = 0
  if(!path.length)
    path = null
  parser.onValue = function () {
    if(!this.root && this.stack.length == 1){
      stream.root = this.value
      }
    if(!path || this.stack.length !== path.length)
      return
    var _path = []
    for( var i = 0; i < (path.length - 1); i++) {
      var key = path[i]
      var c = this.stack[1 + (+i)]
      
      if(!c) {
        console.log(c, this.stack.length)
        return
      }
      var m = 
       ( 'string' === typeof key 
          ? c.key == key
          : key.exec(c.key)) 
      _path.push(c.key)
        
       if(!m)
        return
      
    }
    var c = this
 
    var key = path[path.length - 1]
      var m = 
       ( 'string' === typeof key 
          ? c.key == key
          : key.exec(c.key)) 
     if(!m)
      return
      _path.push(c.key)

  count ++
  stream.emit('data', this.value[this.key])
  }


  parser.onError = function (err) {
    stream.emit('error', err)
  }
  stream.readable = true
  stream.writable = true
  stream.write = function (chunk) {
    parser.write(chunk)
  }
  stream.end = function (data) {
    if(data)
      stream.write(data)
    if(!count)
      stream.emit('data', stream.root)
    stream.emit('end')
  }
  return stream
}