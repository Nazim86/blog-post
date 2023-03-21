// import Imap from "imap"
// import {simpleParser} from "mailparser";
//
// import imaps from "imap-simple"
// import _ from "lodash"
//
// //
// // // Configure the IMAP client with the credentials and settings of the email account
// // const imap = new Imap({
// //     user: 'example@email.com',
// //     password: 'password',
// //     host: 'imap.example.com',
// //     port: 993,
// //     tls: true,
// //     tlsOptions: { rejectUnauthorized: false }
// // });
// //
// // // Connect to the email account and retrieve the emails
// // imap.connect();
// // imap.once('ready', () => {
// //     imap.openBox('INBOX', true, (err, box) => {
// //         if (err) throw err;
// //
// //         // Search for emails with a specific subject
// //         const searchCriteria = ['SUBJECT', 'Email Confirmation'];
// //         const fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'], struct: true };
// //         const fetchStream = imap.search(searchCriteria, (err, uids) => {
// //             if (err) throw err;
// //             const fetchByUID = uids.join(',');
// //             const fetchOptions = { bodies: ['TEXT'], struct: true };
// //             const fetchStream = imap.fetch(fetchByUID, fetchOptions);
// //
// //             fetchStream.on('message', (msg, seqno) => {
// //                 const emailContent = {};
// //
// //                 // Parse email content from the fetched message
// //                 msg.on('body', (stream, info) => {
// //                     simpleParser(stream, (err, parsed) => {
// //                         if (err) throw err;
// //                         emailContent.text = parsed.text;
// //                         emailContent.html = parsed.html;
// //                     });
// //                 });
// //
// //                 // Once the email content is retrieved, perform your assertions
// //                 msg.once('end', () => {
// //                     // Assert that the email content matches your expectations
// //                     console.log(emailContent);
// //                 });
// //             });
// //
// //             fetchStream.once('end', () => {
// //                 imap.end();
// //             });
//
//
//
//
//             // let config = {
//             //     imap: {
//             //         user: process.env.gmailEmail,
//             //         password: process.env.gmailPass,
//             //         host: 'imap.gmail.com',
//             //         port: 993,
//             //         tls: true,
//             //         authTimeout: 3000
//             //     }
//             // };
//
//             // imaps.connect(config).then(function (connection) {
//             //     return connection.openBox('INBOX').then(function () {
//             //         let searchCriteria = ['SUBJECT', "Email Confirmation"];
//             //         let fetchOptions = {
//             //             bodies: ['HEADER', 'TEXT'],
//             //         };
//             //         return connection.search(searchCriteria, fetchOptions).then(function (messages) {
//             //             messages.forEach(function (item) {
//             //                 let all = _.find(item.parts, { "which": "TEXT" })
//             //                 let html = (Buffer.from(all.body, 'base64').toString('ascii'));
//             //                 console.log(html)
//             //             });
//             //         });
//             //     });
//             // });
//             //
//
//
// const imapConfig = {
//     user: "fuadson86@gmail.com",
//     password: "vgxsdkevoiqvtbqx",
//     host: 'imap.gmail.com',
//     port: 993,
//     tls: true,
// };
// const getEmails = () => {
//     try {
//         const imap = new Imap(imapConfig);
//         imap.once('ready', () => {
//             imap.openBox('INBOX', false, () => {
//                 imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {
//                     const f = imap.fetch(results, {bodies: ''});
//                     f.on('message', msg => {
//                         msg.on('body', stream => {
//                             simpleParser(stream, async (err, parsed) => {
//                                 // const {from, subject, textAsHtml, text} = parsed;
//                                 console.log(parsed);
//                                 /* Make API call to save the data
//                                    Save the retrieved data into a database.
//                                    E.t.c
//                                 */
//                             });
//                         });
//                         msg.once('attributes', attrs => {
//                             const {uid} = attrs;
//                             imap.addFlags(uid, ['\\Seen'], () => {
//                                 // Mark the email as read after reading it
//                                 console.log('Marked as read!');
//                             });
//                         });
//                     });
//                     f.once('error', ex => {
//                         return Promise.reject(ex);
//                     });
//                     f.once('end', () => {
//                         console.log('Done fetching all messages!');
//                         imap.end();
//                     });
//                 });
//             });
//         });
//
//         imap.once('error', err => {
//             console.log(err);
//         });
//
//         imap.once('end', () => {
//             console.log('Connection ended');
//         });
//
//         imap.connect();
//     } catch (ex) {
//         console.log('an error occurred');
//     }
// };
//
// getEmails();
