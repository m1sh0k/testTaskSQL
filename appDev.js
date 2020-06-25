var express = require('express');
var http = require('http');
var path = require('path');
var ip = require('ip');
var fs = require('fs');
var config = require('./config');
var bodyParser = require('body-parser');


var app = express();
app.set('port', config.get('port'));
app.disable('x-powered-by');

//webPack
var webpack = require('webpack');
var devMiddleware = require('webpack-dev-middleware');
var configWP = require('./config/webpack.dev.config.js');//Development mod webPack config
//var configWP = require('./config/webpack.prod.config.js');//Production mod webPack config
var webpackHRM = require('webpack-hot-middleware');
var compiler = webpack(configWP);
app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath:  configWP.output.publicPath,
}));
app.use((webpackHRM)(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//Routes
var routes = require('./middleware/routes');
routes(app);
//
app.use(express.static(path.join(__dirname, './public')));

app.use('/*', function (req, res, next) {
    var filename = path.join(compiler.outputPath,'index.html');
    console.log('index filename path: ', filename);
    compiler.outputFileSystem.readFile(filename, function(err, result){
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(result);
        res.end();
    });
 });
//Create Server
var server = http.createServer(app);
//var server = https.createServer(options,app);
server.listen(config.get('port'), function(){
    console.log('Express server listening on ip:',ip.address(),',port:',config.get('port'));
});






