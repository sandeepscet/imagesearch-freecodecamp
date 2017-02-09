var mongo = require('mongodb').MongoClient
var url = 'mongodb://freecodecamp:freecodecamp@ds145669.mlab.com:45669/shorturl-freecodecamp'


function mongoInsert(doc,callback)
{

        /*
        var doc = {
          term: term, when:when
        }
        */
        mongo.connect(url, function(err, db) {
          if (err) throw err
          var collection = db.collection('imageSearched')
          collection.insert(doc, function(err, data) {
            if (err) throw err
            
            db.close()
            callback(data)
          })
        })

}


function mongoFindByMatch(word,offset = 0,callback)
{
        //:word = "/"+word+"/";
        mongo.connect(url, function(err, db) {
          if (err) throw err
          var collection = db.collection('imageData')
          collection.find({snippet: new RegExp(word)}).skip(offset).toArray(function(err, docs) {
            if (err) throw err
            db.close()
            callback(docs)
          })
        })

}

function mongoGetSortBy(callback)
{
        
         mongo.connect(url, function(err, db) {
          if (err) throw err
          var collection = db.collection('imageSearched')
          collection.find().sort({when:-1}).limit(10).toArray(function(err, docs) {
            if (err) throw err
            db.close()
            callback(docs)
          })
        })

}


module.exports = { 
   mongoInsert : mongoInsert,
   mongoFindByMatch : mongoFindByMatch,
   mongoGetSortBy : mongoGetSortBy
};
