var http = require('http')
var url = require('url')

var server = http.createServer(router({
  '/': function(req, res) {
    res.writeHead(200)
    res.end('Hello world From yiren and version update at 11:40')
  },

  '/bye': function(req, res) {
    res.writeHead(200)
    res.end('Bye~')
  }
}))

server.listen(8089, function() {
  console.log('process.env.PORT', process.env.PORT)
  console.log('process.env.PORT', process.env)
  console.log('Docker DEMO with Node.js is running.')
})

module.exports = server

// A simple router
function router(routes) {
  var paths = Object.keys(routes)
  var regexs = paths.map(function(path) {
    return new RegExp('^' + path + '$')
  })

  return function(req, res) {
    var reqUrl = url.parse(req.url).pathname
    for (var i = 0; i < regexs.length; i++) {
      if (reqUrl.match(regexs[i]) != null) {
        var path = paths[i]
        return routes[path].call(server, req, res)
      }
    }

    // Page not found
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    })
    res.end('Page not found.')
  }
}
