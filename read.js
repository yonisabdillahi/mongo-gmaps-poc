var http = require('http');
http.createServer(function (req, res) {

    var mongoDB_url = 'mongodb://localhost:27017';
    var dbName = 'game-of-thrones';

    // Retrieve 
    var MongoClient = require('mongodb').MongoClient;
    // Connect to the db 
    MongoClient.connect(mongoDB_url, function (error, client) {

        if (error) {
            return console.dir(error);
        }

        var db = client.db(dbName);

        var collection = db.collection('locations');

        collection.find().toArray(function (error, docs) {

            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Access-Control-Allow-Origin': '*'
            });

            var intCount = docs.length;
            console.log(intCount);

            if (intCount > 0) {
                res.write("[");
                for (var i = 0; i < intCount; i++) {
                    var jsonText = JSON.stringify({
                        name: docs[i].properties.name.toString(),
                        lat: docs[i].geometry.coordinates[0].toString(),
                        lon: docs[i].geometry.coordinates[1].toString()
                    });
                    console.log(jsonText);
                    res.write(jsonText);
                    if (i != intCount - 1) res.write(",");
                }
                res.write("]");
            }

            res.end();
        });
    });
}).listen(3001, '0.0.0.0');
console.log('Server running at http00.0.0.1:3001:');