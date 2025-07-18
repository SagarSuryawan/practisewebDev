var express = require('express');
var app = express();
var _ = require('underscore');
var q = require('q');
var emailvalidator = require('../index.js');

var webServerController = function(options) {
  var checkEmailAddress = q.denodeify(emailvalidator.checkEmailAddress);
  var getExternalIp = q.denodeify(emailvalidator.getExternalIp);

  options = _.extend({port: '3000', externalIpAddress: ''}, options);

  app.set('options', options);

  if (options.externalIpAddress === '') {
    getExternalIp().then(function(data) {
      options.externalIpAddress = data;
      app.set('options', options);
    }, function(error) {
      throw error;
    });
  }

  app.get('/:email', function(req, res) {
    options = app.get('options');

    checkEmailAddress(req.params.email, options).then(function(data) {
      res.send(data);
    }, function(error) {
      res.send(error);
    });

  });

  app.listen(options.port);
};

module.exports = webServerController;
