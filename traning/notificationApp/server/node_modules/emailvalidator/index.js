var q = require('q');
var externalAddressController = require('./controllers/externalAddressController');
var emailValidatorController = require('./controllers/validatorController');

var EmailValidator = {
  /**
   * checks an email address for validity.
   * @param email string
   * @param options " {externalIpAddress: string, redisPort: integer, redisHost: string} "
   * @param callback function(failure, success)
   */
  checkEmailAddress: function(email, options, callback) {
    emailValidatorController.checkEmailAddress(email, options).then(function(data) {
      callback(null, data);
    }, function(error) {
      callback(error, null);
    });

  },

  /**
   * gets the external IP address from a 3rd party api
   * @param callback function(failure, success)
   */
  getExternalIp: function(callback) {
    externalAddressController.getAddress().then(function(data) {
      callback(null, data);
    }, function(error) {
      callback(error, null);
    });
  },

  /**
   * starts the web server with the options specified.
   *  {
   *    port: integer,
   *    externalIpAddress: string,
   *    redisPort: integer,
   *    redisHost: string
   *  }
   * @param options
   * @param callback
   */
  startWebServer: function(options, callback) {
    require('./controllers/webServerController')(options);
  }

};

module.exports = EmailValidator;

// start the web server automatically if the startWebServer parameter is passed
if (process.argv.length >= 3 && process.argv[2] === 'startWebServer') {
  var options = {
    redisPort: 6379,
    port: 3000
  };
  if (process.argv.length >= 4) {
    options.redisPort = process.argv[3];
  }
  if (process.argv.length >= 5) {
    options.port = process.argv[4];
  }
  EmailValidator.startWebServer(options);
}

