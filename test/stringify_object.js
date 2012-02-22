
var fs = require ('fs')
  , join = require('path').join
  , file = join(__dirname, 'fixtures','all_npm.json')
  , JSONStream = require('../')
  , it = require('it-is').style('colour')

  function randomObj () {
    return (
      Math.random () < 0.4
      ? {hello: 'eonuhckmqjk',
          whatever: 236515,
          lies: true,
          nothing: [null],
          stuff: [Math.random(),Math.random(),Math.random()]
        } 
      : ['AOREC', 'reoubaor', {ouec: 62642}, [[[], {}, 53]]]
    )
  }

var expected =  {}
  , stringify = JSONStream.stringifyObject()
  , es = require('event-stream')
  , stringified = ''
  , called = 0
  , count = 10
  , ended = false
  
es.connect(
  stringify,
  es.writeArray(function (err, lines) {
    it(JSON.parse(lines.join(''))).deepEqual(expected)
    console.error('PASSED')
  })
)

while (count --) {
  var key = Math.random().toString(16).slice(2)
  expected[key] = randomObj()
  stringify.write(key, expected[key])
}

stringify.end()
