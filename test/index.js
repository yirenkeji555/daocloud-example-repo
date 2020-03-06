var should = require('chai').should()
var mock = require('./mock')

var server = require('../server')

describe('Web Test', function() {
  it('should return \'Hello World!\' with status code 200', function(callback) {
    mock.request(server, '/', 'GET', function() {
      var body = this.buffer.toString()

      body.should.be.equal('Hello world!')
      this.statusCode.should.be.equal(200)

      callback()
    })
  })

  it('should return \'Bye~\' with status code 200', function(callback) {
    mock.request(server, '/bye', 'GET', function() {
      var body = this.buffer.toString()

      body.should.be.equal('Bye~')
      this.statusCode.should.be.equal(200)

      callback()
    })
  })

  it('should return \'Page not found.\' with status code 404', function(callback) {
    mock.request(server, '/foobar', 'GET', function() {
      var body = this.buffer.toString()

      body.should.be.equal('Page not found.')
      this.statusCode.should.be.equal(404)

      callback()
    })
  })
})
