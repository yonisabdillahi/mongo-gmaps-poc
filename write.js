var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var latitude = query.lat;
    var longitude = query.lon;

    var usuario = query.name; // Retrieve 
    var MongoClient = require('mongodb').MongoClient; 

    var mongoDB_url = 'mongodb://localhost:27017';
    var dbName = 'game-of-thrones';


    //Connect to MongoDB 
    MongoClient.connect(mongoDB_url, function(error, client) { 

        if(error) { 
            return console.dir(error); 
        } 

        var db = client.db(dbName);

        //Choose passangers collection 
        var collection = db.collection('locations'); 
        var doc = { 
            'name': usuario, 
            'loc': { 
                'type': 'Point',
                'coordinates': [latitude, longitude] 
            } 
        }
        collection.insertOne(doc , { w: 0 });
        
    });

    }).listen(3000, '0.0.0.0'); 
    console.log('Server running at http 0.0.0.0:3000:');

