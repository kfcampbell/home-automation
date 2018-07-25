'use strict';

const { ToggleRoomLights } = require('./RoomLightsHelper');
const AWS = require('aws-sdk');

const SES = new AWS.SES();
const EMAIL_ADDRESS = 'keeg4n.campbell@gmail.com'; // change it to your email address

// Send a verification email to the given email address.
function sendVerification(email, callback) {
  SES.verifyEmailIdentity({ EmailAddress: email }, (err) => {
    callback(err || 'Verification email sent. Please verify it.');
  });
}

// Check whether email is verified. Only verified emails are allowed to send emails to or from.
function checkEmail(email, callback) {
  SES.getIdentityVerificationAttributes({ Identities: [email] }, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    const attributes = data.VerificationAttributes;
    if (!(email in attributes) || attributes[email].VerificationStatus !== 'Success') {
      sendVerification(email, callback);
    } else {
      callback(err, data);
    }
  });
}

exports.handler = (event, context, callback) => {
  console.log('Received event:', event);

  ToggleRoomLights().then(() => {
    console.log('lights toggled successfully');
  })
    .catch((error) => {
      console.log('lights toggled unsuccessfully', error);
    });
};

ToggleRoomLights().then((success) => {
  console.log('lights toggled successfully', success);
})
  .catch((error) => {
    console.log('lights toggled unsuccessfully', error);
  });