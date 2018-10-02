'use strict';
const
    AWS = require('aws-sdk'),
    S3 = new AWS.S3();

exports.handler = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'XML Parsed',
            input: event,
        })
    };

    console.log('xml', event.body)

    S3.putObject({
      Bucket: 'usman-test-bucket-123',
      Key: 'abc.xml',
      Body: event.body
    })
      .promise()
      .then(() => callback(null, response))
      .catch(e => {
        console.error('ERROR', e);
        callback(e);
      });


};