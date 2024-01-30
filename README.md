# HelloSMS.js
A very simple module for sending SMS using Javascript and the (https://www.hellosms.se)[HelloSMS] service.

The module is written in async javascript and suitable for NodeJS or similar application. Currently written as a Common JS module but can easily be converted.

I am not affiliated with HelloSMS other than that I use their services for some of my projects.

### Example 1: Send message to a recipient

````javascript
const helloSMS = require('./hellosms.js');
var smsDispatcher = new helloSMS.SMSDispatcher('USERNAME','PASSWORD','0710000000');
var smsMessage = new helloSMS.SMSMessage('0720000000','The text of the message');
smsDispatcher.SendMessage(smsMessage).then((result)=>{
 //Do Stuff
});
````

### Example 2: Send to multiple recipients
````javascript
const helloSMS = require('./hellosms.js');
var smsDispatcher = new helloSMS.SMSDispatcher('USERNAME','PASSWORD','0710000000');
var smsMessage = new helloSMS.SMSMessage(['0720000000','0720000001','0720000002'],'The text of the message');
smsDispatcher.SendMessage(smsMessage).then((result)=>{
  //Do Stuff
}
});
````

### Example 3: Send at specific time and set some other options
````javascript
const helloSMS = require('./hellosms.js');
var smsDispatcher = new helloSMS.SMSDispatcher('USERNAME','PASSWORD','0710000000');
smsDispatcher.RequestCallback = false;
smsDispatcher.TestMode = false;
smsDispatcher.AutomaticallyShortenLinks = false;
smsDispatcher.LoggingSubject = "Campagin 5";
var smsMessage = new helloSMS.SMSMessage('0720000000','The text of the message',new Date('2026-01-01'));
smsDispatcher.SendMessage(smsMessage).then((result)=>{
  //Do Stuff
}
});
````
