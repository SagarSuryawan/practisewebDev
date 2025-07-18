# EmailValidator

EmailValidator is a simple node.js helper library to check an email address's validity without sending a single email.

## Why?

If you send commercial email you know getting your email delivered is very hard - even if you follow all the rules. A high bounce rate (above 3%) can cause your delivery rates to drop dramatically. By validating email addresses that your team may collect over the phone and hand enter into a CRM you can protect yourself and decrease your bounce rate. Thereby increasing your email marketing effectiveness.

## Features

* Very basic email syntax check. 
* Check for valid MX records
* If no MX records are found, check for valid A record
* Verify MX/A has a listening email server
* Redis used as a cache to improve speed and avoid bombarding mail servers

## Risks

It is possible that if you query a single provider too much that the email provider will block you. We've implemented a Redis cache to mitigate this.

It is possible that you perform a validity check when an ISP's SMTP server is down, inaccurately noting it as offline.

To do: Right now we just query the first MX record instead of all of them. The code should be refactored to loop through each MX record asynchronously. Anyone care to help?

## Installation

setup redis

`./src/redis-server /usr/redis-2.8.9/redis.conf`

We'll just use the default port. If you have something custom, then you'll need to configure the connection.

Next, install the package

`npm install emailvalidator`


## Using as a node module

In the simplest form you can just call:

```javascript
var options = {
    externalIpAddress: '93.184.216.119', 
    redisPort: 6379, 
    redisHost: '127.0.0.1'
}
require('emailvalidator').checkEmailAddress('me@lucasjans.com', options, callback);
```

The parameters are optional, but should you lave a blank externalIpAddress you may affect the accuracy of the program.

To lookup your external IP address, just call

```javascript
require('emailvalidator').getExternalIp(callback)
```

the callback is `function(error, response)`

the response object is:

```javascript
{
    "email": "me@lucasjans.com",
    "valid": false,
    "reason": "no server to receive mail. cannot connect to mail exchanger"
}
```

## Using as a Microservice

Built into this module is a webserver that responds to GET requests on /:email

To start this webserver automatically, just run `npm start`

Otherwise, you can run it programatically by calling 

```javascript
var options = {
    // defaults to 3000
    port: integer,
    // if null/empty we will look this up automatically
    externalIpAddress: '',
    // defaults to 127.0.0.1
    redisHost: integer,
    // defaults to 6379
    redisPort: integer
}

require('emailvalidator').startWebServer(options)
```


