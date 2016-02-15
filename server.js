const http = require('http')
    ,https = require('https')
    ,express = require('express')
    ,routes = require('./routes')
    //,user = require('./routes/user')
    ,path = require('path')
    ,favicon = require('serve-favicon')
    ,logger = require('morgan')
    ,methodOverride = require('method-override')
    ,bodyParser = require('body-parser')
    ,errorHandler = require('errorhandler');
    

var app = express();

app.set('port', process.env.NODE_PORT || 3000);
app.set('ip', process.env.NODE_IP || '127.0.0.1');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/assets/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/', function(req, resp) {
    resp.sendFile('index.html', {
        root: __dirname + '/public/'
    });
});

app.get('/*', function(req, resp) {
    var geturl = req.originalUrl.substr(1);
    console.log('geturl:', geturl);
    
    geturl = !geturl.indexOf('http') ? geturl : 'http://' + geturl;
    var onHttps = geturl.indexOf('https') != -1;
    
    var googleApiUrl = 'http://chart.googleapis.com/chart?cht=qr&chs=200x200&choe=UTF-8&chld=L|0&chl=';
    var imgurl = googleApiUrl + encodeURIComponent(geturl);
    
    resp.render('frame', {
        title: 'qrto.me',
        imgurl: imgurl,
        siteurl: geturl,
        onHttps: onHttps
    });
});

var server = http.createServer(app);
server.listen(app.get('port'), app.get('ip'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});