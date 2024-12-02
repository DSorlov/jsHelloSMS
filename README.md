# HelloSMS
A very simple module for sending SMS using Javascript and the [HelloSMS](https://www.hellosms.se) service.

The module is written in async javascript and suitable for NodeJS or similar application.

I am not affiliated with HelloSMS other than that I use their services for some of my projects.

### Example 1: Send message to a recipient

First initiate the API by instanciating an instance of [SMSDispacher](HelloSMS.md#hellosmssmsdispatcher),
then we send it using the an instance of a [SMSMessage](HelloSMS.md#hellosmssmsmessage)
The result is of type [SMSDispatchResult](HelloSMS.md#hellosmssmsdispatchresult--object)

````javascript
import { SMSDispatcher, SMSMessage } from 'hellosms'
var smsDispatcher = new SMSDispatcher('USERNAME','PASSWORD','0710000000');
var smsMessage = new SMSMessage('0720000000','The text of the message');
smsDispatcher.SendMessage(smsMessage).then((result)=>{
 //Do Stuff
});
````

### Example 2: Send to multiple recipients

The only major difference here is that we send an array of phone numbers.

````javascript
import { SMSDispatcher, SMSMessage } from 'hellosms'
var smsDispatcher = new SMSDispatcher('USERNAME','PASSWORD','0710000000');
var smsMessage = new SMSMessage(['0720000000','0720000001','0720000002'],'The text of the message');
smsDispatcher.SendMessage(smsMessage).then((result)=>{
  //Do Stuff
});
````

### Example 3: Send at specific time and set some other options

This is a bit more involved and we first set some options on the dispatcher and also schedule the message for a specific date.

````javascript
import { SMSDispatcher, SMSMessage } from 'hellosms'
var smsDispatcher = new SMSDispatcher('USERNAME','PASSWORD','0710000000');
smsDispatcher.RequestCallback = false;
smsDispatcher.TestMode = false;
smsDispatcher.AutomaticallyShortenLinks = false;
smsDispatcher.LoggingSubject = "Campagin 5";
var smsMessage = new SMSMessage('0720000000','The text of the message',new Date('2026-01-01'));
smsDispatcher.SendMessage(smsMessage).then((result)=>{
  //Do Stuff
});
````
