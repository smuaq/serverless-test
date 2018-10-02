const
    AWS = require('aws-sdk'),
    S3 = new AWS.S3();

var xml2js = require('xml2js');
var parser = new xml2js.Parser({
    explicitArray: false
});

var responseConfig = require('./lib/response');

exports.handler = (event, context, callback) => {

    var response = {};

    S3.getObject({
        Bucket: event.Records[0].s3.bucket.name,
        Key: event.Records[0].s3.object.key
    })
        .promise()
        .then((response) =>{
            parser.parseString(response.Body.toString('utf-8'), function (err, result) {
                S3.putObject({
                    Bucket: event.Records[0].s3.bucket.name,
                    Key: `${process.env.BUCKET_PATH}/parser.json`,
                    Body: JSON.stringify(result)
                })
                    .promise()
                    .then(() => callback(null, response))
                    .catch(e => {
                        console.error('ERROR', e);
                        response = responseConfig.failure(500,e);
                        callback(e);
                    });

            });
        })
        .catch(e => {
            console.error('ERROR', e);
            callback(e);
        });
};