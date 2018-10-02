const
  AWS = require('aws-sdk'),
  S3 = new AWS.S3();

var responseConfig = require('./lib/response');

exports.handler = (event, context, callback) => {

  var response = {};

  S3.putObject({
    Bucket: 'shahrukh-crud',
    Key: 'parser.xml',
    Body: event.Records[0].body
  })
    .promise()
    .then(() => {
      response = responseConfig.success(200, {
        message: 'XML Saved',
        input: event,
      })
      return callback(null, response)
    })
    .catch(e => {
      console.error('ERROR', e);
      response = responseConfig.failure(500, e)
      callback(response);
    });

};
