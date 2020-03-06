// HTTP mock
exports.request = function(server, url, method, callback) {
  var req = new Request(method, url)
  var res = new Response(callback)

  server.emit('request', req, res)
}

function Request(method, url) {
  this.method = method
  this.url = url
}

function Response(callback) {
  this.statusCode = 500
  this._headers = {}
  this.buffers = []
  this.callback = callback
}
Response.prototype.writeHead = function(statusCode, headers) {
  this.statusCode = statusCode
  this._headers = merge(this._headers, headers)

  return this
}
Response.prototype.setHeader = function(key, value) {
  this._headers[key] = value

  return this
}
Response.prototype.getHeader = function(key) {
  return this._headers[key]
}
Response.prototype.write = function(content) {
  this.buffers.push(new Buffer(content))

  return this
}
Response.prototype.end = function(content) {
  if (content) this.write(content)

  this.buffer = Buffer.concat(this.buffers)

  this.callback.apply(this)

  return this
}

function merge(target) {
  var origins = [].slice.call(arguments, 1)

  origins.forEach(function(origin) {
    var keys = Object.keys(origin || {})

    keys.forEach(function (key) {
      if (origin.hasOwnProperty(key)) {
        target[key] = origin[key]
      }
    })
  })

  return target
}
