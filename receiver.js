const
    AWS = require('aws-sdk'),
    S3 = new AWS.S3();

exports.handler = (event, context, callback) => {

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'XML Saved',
            input: event,
        })
    };

    S3.putObject({
        Bucket: 'usman-test-bucket-123',
        Key: 'parser.xml',
        Body: event.Records[0].body
    })
        .promise()
        .then(() => callback(null, response))
        .catch(e => {
            console.error('ERROR', e);
            callback(e);
        });

};
