var AWS = require('aws-sdk');
var sqs = new AWS.SQS({
    region: `${process.env.AWS_REGION}`
});

var responseConfig = require('./shared/lib/response');

exports.handler = function(event, context, callback) {
    var accountId = context.invokedFunctionArn.split(":")[4];
    var queueUrl = `${process.env.QUEUE_URL}/${accountId}/${process.env.QUEUE_NAME}`;

    var response = {};

    // SQS message parameters
    var params = {
        MessageBody: event.body,
        QueueUrl: queueUrl
    };
    sqs.sendMessage(params, function (err, data) {
        if (err) {

            let statusCode = 500;
            if(err.code === 'MissingRequiredParameter'){
                err['message'] = 'Please enter some data';
                statusCode = 400;
            }

            response = responseConfig.failure(statusCode, err);

        } else {
            response = responseConfig.success(200, {
                message: 'Sent to ' + queueUrl,
                messageId: data.MessageId
            })
        }
        callback(null, response);
    });
};