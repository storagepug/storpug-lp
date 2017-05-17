
/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'storpug';

// [START sendAlertEmail]
/**
 * Sends a welcome email to new user.
 */
exports.sendAlertEmail = functions.database.ref('earlyAccessSignUp/{pushId}').onWrite(event => {
        const data = event.data.val(); // The Firebase user.

const email = data.email; // The email of the user.
const subject = 'New Early Access Signup';
const message = 'Hello mate, there was a new sign up on storpug for early access.';
console.log('event')
console.log(event)
console.log('data')
console.log(data)

    sendAlertEmail(data, 'rajeffords@gmail.com', subject, message);
    sendAlertEmail(data, 'mthuddleston@gmail.com', subject, message);
    return sendAlertEmail(data, 'tommy@rcd.cool', subject, message);
});


// Sends a welcome email to the given user.
function sendAlertEmail(data, email, subject, message) {
    const mailOptions = {
        from: '"Matt Huddleston" <mhuddleston@rcd.cool>',
        to: email
    };

    // The user unsubscribed to the newsletter.
    mailOptions.subject = `${APP_NAME} - ${subject}`;
    mailOptions.text = 'Subject: ' + subject + '\n\nMessage: ' + message + '\n\nEmail: ' + data.email;
    return mailTransport.sendMail(mailOptions).then(() => {
            console.log('New welcome email sent to: ' + email);
});
}
