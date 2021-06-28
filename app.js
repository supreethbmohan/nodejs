var http = require('http');  
var url = require('url');  
  
http.createServer(function (req, res) {  
    // Parsing url   
    var queryString = url.parse(req.url,true);  
    // Accessing href property of an URL  
    console.log("Complete href is :-"+queryString.href);  
    
}).listen(3000);