var express = require('express')
var app = express()
var mongoUtil = require('./mongoUtil.js');


app.get('/imagesearch/:term', function(req, res) {
  var term = req.params.term;
  var offset= req.query.offset;

   var doc = {
          term: term, when:+ new Date()
        }
    mongoUtil.mongoInsert(doc, function(){ /*empty callback*/});

  if(offset && Number.isNaN(offset)) {
    return res.status(404).send("Offset is not proper");
  } else {
    mongoUtil.mongoFindByMatch(term, parseInt(offset), function ( docs) {
    
      if (docs && docs.length) {
        for(key in docs)
        {
          delete docs[key]['_id'];
        }

        return res.send(docs);
      } else {
        return res.status(200).send("No record found");
      }
    });

  }
});

app.get('/latest/imagesearch/', function(req,res) {
  
    mongoUtil.mongoGetSortBy(function (docs) {
      if(docs && docs.length) {

        for(key in docs)
        {
          delete docs[key]['_id'];
          docs[key]['when'] = new Date(docs[key]['when']).toISOString()
        }
        return res.status(200).send(docs);
      }
      else
      {
       return res.status(200).send('No records found'); 
      }
    });
});




app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
