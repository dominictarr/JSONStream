# JSONStream

streaming JSON.parse and stringify

## example

in node v0.4.x

```javascript

var request = require('request')
  , JSONStream = require('JSONStream')
  , es = require('event-stream')

var parser = JSONStream.parse(['rows', /./]) //emit parts that match this path (any element of the rows array)
  , req = request({url: 'http://isaacs.couchone.com/registry/_all_docs'})
  
```

in node 0.4.x


```javascript

req.pipe(parser)
parser.pipe(es.log(''))

```

in node v0.5.x


```javascript
req.pipe(parser).pipe(es.log(''))

```

## JSONStream.parse(path)

usally, a json API will return a list of objects.  

`path` should be an array of property names and/or `RedExp`s.
any object that matches the path will be emitted as 'data' (and `pipe()`d down stream)

if `path` is empty or null, or if no matches are made:
JSONStream.parse will only emit 'data' once, emitting the root object.

for example, couchdb returns views like this:

``` bash
curl -sS localhost:5984/tests/_all_docs
```
returns this:

``` js
{"total_rows":129,"offset":0,"rows":[
  { "id":"change1_0.6995461115147918"
  , "key":"change1_0.6995461115147918"
  , "value":{"rev":"1-e240bae28c7bb3667f02760f6398d508"}
  , "doc":{
      "_id":  "change1_0.6995461115147918"
    , "_rev": "1-e240bae28c7bb3667f02760f6398d508","hello":1}
  },
{"id":"change2_0.6995461115147918","key":"change2_0.6995461115147918","value":{"rev":"1-13677d36b98c0c075145bb8975105153"},"doc":{"_id":"change2_0.6995461115147918","_rev":"1-13677d36b98c0c075145bb8975105153","hello":2}},
...
]}

```

we are probably interested in the `rows.*.docs`  

create a `Stream` that parses the documents from the feed like this:

``` js
JSONStream.parse(['rows', /./, 'doc']) //rows, ANYTHING, doc
```
 
awesome!

## todo

  * JSONStream.stringify()

## Acknowlegements

  this module depends on https://github.com/creationix/jsonparse  
  by Tim Caswell  
  and also thanks to Florent Jaby for teaching me about parsing with:
  https://github.com/Floby/node-json-streams
