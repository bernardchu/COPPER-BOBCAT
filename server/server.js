var express = require('express');
var app = express();



app.set('port', 3000);

app.use(express.static(__dirname + '../../public'));

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// });

app.listen(app.get('port'));