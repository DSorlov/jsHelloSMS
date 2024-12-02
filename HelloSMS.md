<a name="module_hellosms"></a>

## hellosms
Module for sending SMS messages via the HelloSMS API

**Version**: 2.0.0  

* [hellosms](#module_hellosms)
    * [~SMSDispatcher](#module_hellosms..SMSDispatcher)
        * [new SMSDispatcher(username, password, sender)](#new_module_hellosms..SMSDispatcher_new)
        * [.SendMessage(message)](#module_hellosms..SMSDispatcher+SendMessage) ⇒ <code>Promise.&lt;SMSDispatchResult&gt;</code>
    * [~SMSMessage](#module_hellosms..SMSMessage)
        * [new SMSMessage(recipient, text, [sendTime])](#new_module_hellosms..SMSMessage_new)
    * [~responseObject](#module_hellosms..responseObject) : <code>SMSDispatchResult</code>
    * [~SMSDispatchResult](#module_hellosms..SMSDispatchResult) : <code>Object</code>
    * [~SMSMessageResult](#module_hellosms..SMSMessageResult) : <code>Object</code>

<a name="module_hellosms..SMSDispatcher"></a>

### hellosms~SMSDispatcher
**Kind**: inner class of [<code>hellosms</code>](#module_hellosms)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| LoggingSubject | <code>string</code> | The sender of the message as logged in the API |
| AutomaticallyShortenLinks | <code>boolean</code> | Automatically shorten links in the message |
| TestMode | <code>boolean</code> | Enable test mode for the API |
| RequestCallback | <code>boolean</code> | Request a callback from the API |
| RejectUntrustedCert | <code>boolean</code> | Reject untrusted certificates |
| Endpoint | <code>string</code> | The API endpoint to use |
| Username | <code>string</code> | The username for the API |
| Password | <code>string</code> | The password for the API |
| Sender | <code>string</code> | The sender of the message |


* [~SMSDispatcher](#module_hellosms..SMSDispatcher)
    * [new SMSDispatcher(username, password, sender)](#new_module_hellosms..SMSDispatcher_new)
    * [.SendMessage(message)](#module_hellosms..SMSDispatcher+SendMessage) ⇒ <code>Promise.&lt;SMSDispatchResult&gt;</code>

<a name="new_module_hellosms..SMSDispatcher_new"></a>

#### new SMSDispatcher(username, password, sender)
Class for sending SMS messages via the HelloSMS API


| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The username for the API |
| password | <code>string</code> | The password for the API |
| sender | <code>string</code> | The sender of the message |

<a name="module_hellosms..SMSDispatcher+SendMessage"></a>

#### smsDispatcher.SendMessage(message) ⇒ <code>Promise.&lt;SMSDispatchResult&gt;</code>
Send a textmessage using the API

**Kind**: instance method of [<code>SMSDispatcher</code>](#module_hellosms..SMSDispatcher)  
**Returns**: <code>Promise.&lt;SMSDispatchResult&gt;</code> - - Promise object with the response from the API  
**Access**: public  

| Param | Type |
| --- | --- |
| message | [<code>SMSMessage</code>](#module_hellosms..SMSMessage) | 

<a name="module_hellosms..SMSMessage"></a>

### hellosms~SMSMessage
**Kind**: inner class of [<code>hellosms</code>](#module_hellosms)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Recipient | <code>string</code> | Recipient phone number |
| Text | <code>string</code> | Text message to send |
| SendTime | <code>Date</code> \| <code>undefined</code> | Optional time to send the message |

<a name="new_module_hellosms..SMSMessage_new"></a>

#### new SMSMessage(recipient, text, [sendTime])
Class to represent a single SMS message


| Param | Type |
| --- | --- |
| recipient | <code>string</code> | 
| text | <code>string</code> | 
| [sendTime] | <code>Date</code> \| <code>undefined</code> | 

<a name="module_hellosms..responseObject"></a>

### hellosms~responseObject : <code>SMSDispatchResult</code>
**Kind**: inner property of [<code>hellosms</code>](#module_hellosms)  
<a name="module_hellosms..SMSDispatchResult"></a>

### hellosms~SMSDispatchResult : <code>Object</code>
Results of dispatching a message, contains a status, results for each recipient, message details, sender, callback status, link shortening status and delay

**Kind**: inner typedef of [<code>hellosms</code>](#module_hellosms)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| status | <code>string</code> | The status of the API request |
| results | <code>Array.&lt;SMSMessageResult&gt;</code> | Array of results for each recipient |
| message | <code>Object</code> | Object with message details |
| message.originalText | <code>string</code> | The original text message |
| message.processedText | <code>string</code> | The processed text message |
| message.encoding | <code>string</code> | The encoding used for the message |
| message.totalChars | <code>number</code> | The total number of characters in the message |
| message.totalMessages | <code>number</code> | The total number of messages in the message |
| sender | <code>string</code> | The sender of the message |
| callbackEnabled | <code>boolean</code> | If a callback was requested |
| automaticallyShortenLinks | <code>boolean</code> | If links were automatically shortened |
| delay | <code>number</code> | The delay in seconds before the message is sent |

<a name="module_hellosms..SMSMessageResult"></a>

### hellosms~SMSMessageResult : <code>Object</code>
A single result of a message dispatch

**Kind**: inner typedef of [<code>hellosms</code>](#module_hellosms)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| apiId | <code>string</code> | The API ID for the message |
| recipient | <code>string</code> | The recipient of the message |
| queued | <code>boolean</code> | If the message was queued for sending |

