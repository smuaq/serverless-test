'use strict';

exports.success = function(code,body) {
  return buildResponse(code, body);
};

exports.failure = function(code,body) {
  return buildResponse(code, body);
};

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}