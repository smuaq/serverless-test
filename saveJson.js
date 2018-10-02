const
    AWS = require('aws-sdk'),
    S3 = new AWS.S3();

var xml2js = require('xml2js');
var parser = new xml2js.Parser({
    explicitArray: false
});

exports.handler = (event, context, callback) => {

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'JSON Saved',
            input: event,
        })
    };

    S3.getObject({
        Bucket: event.Records[0].s3.bucket.name,
        Key: event.Records[0].s3.object.key
    })
        .promise()
        .then((response) =>{
            parser.parseString(response.Body.toString('utf-8'), function (err, result) {
                S3.putObject({
                    Bucket: 'usman-test-bucket-123',
                    Key: 'parser.json',
                    Body: JSON.stringify(result)
                })
                    .promise()
                    .then(() => console.log('UPLOAD SUCCESS'))
                    .then(() => callback(null, response))
                    .catch(e => {
                        console.error('ERROR', e);
                        callback(e);
                    });

            });
        })
        .catch(e => {
            console.error('ERROR', e);
            callback(e);
        });
};