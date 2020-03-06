var http = require('http')
var url = require('url')

var server = http.createServer(router({
  '/': function(req, res) {
    res.writeHead(200)
    res.end('Hello world!')
  },

  '/bye': function(req, res) {
    res.writeHead(200)
    res.end('Bye~')
  }
}))

server.listen(parseInt(process.env.PORT) || 80, function() {
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
