var q = require('q');
var request = require('request');

var externalAddressController = {
  getAddress: function() {

    var Q = q.defer();

    request('http://ipinfo.io/ip', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        Q.resolve(body.trim());
      } else {
        Q.reject('error');
      }
    });

    return Q.promise;
  }
};

module.exports = externalAddressController;
