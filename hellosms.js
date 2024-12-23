//@ts-check
import { Agent, request } from 'https';

/**
 * @module hellosms
 * @description Module for sending SMS messages via the HelloSMS API
 * @version 2.0.0
 */

/**
 * Results of dispatching a message, contains a status, results for each recipient, message details, sender, callback status, link shortening status and delay
 * @typedef {Object} SMSDispatchResult
 * @property {string} status - The status of the API request
 * @property {Array<SMSMessageResult>} results - Array of results for each recipient
 * @property {Object} message - Object with message details
 * @property {string} message.originalText - The original text message
 * @property {string} message.processedText - The processed text message
 * @property {string} message.encoding - The encoding used for the message
 * @property {number} message.totalChars - The total number of characters in the message
 * @property {number} message.totalMessages - The total number of messages in the message
 * @property {string} sender - The sender of the message
 * @property {boolean} callbackEnabled - If a callback was requested
 * @property {boolean} automaticallyShortenLinks - If links were automatically shortened
 * @property {number} delay - The delay in seconds before the message is sent
 */

/**
 * A single result of a message dispatch
 * @typedef {Object} SMSMessageResult
 * @property {string} apiId - The API ID for the message
 * @property {string} recipient - The recipient of the message
 * @property {boolean} queued - If the message was queued for sending
 */

/**
 * Class for sending SMS messages via the HelloSMS API
 * @class SMSDispatcher
 * @param {string} username - The username for the API
 * @param {string} password - The password for the API
 * @param {string} sender - The sender of the message
 * @property {string} LoggingSubject - The sender of the message as logged in the API
 * @property {boolean} AutomaticallyShortenLinks - Automatically shorten links in the message
 * @property {boolean} TestMode - Enable test mode for the API
 * @property {boolean} RequestCallback - Request a callback from the API
 * @property {boolean} RejectUntrustedCert - Reject untrusted certificates
 * @property {string} Endpoint - The API endpoint to use
 * @property {string} Username - The username for the API
 * @property {string} Password - The password for the API
 * @property {string} Sender - The sender of the message
 */
class SMSDispatcher {
    LoggingSubject="HelloSMS.js"
    AutomaticallyShortenLinks=false;
    TestMode=false;
    RequestCallback=false;
    RejectUntrustedCert=false;
    Endpoint="https://api.hellosms.se/v1/sms/send/"
    Username;
    Sender;
    #Password;

    constructor(/** @type string */username,/** @type string */password,/** @type string */sender) {
        this.Sender = sender;
        this.Username = username;
        this.#Password = password;
    }

    set Password(/** @type string */value) {
        this.#Password = value;
    }
    
    get Password() {
        throw "Not allwoed to read password back"
    }    

    //@ts-ignore
    async #httpsPost(/** @type Object */ data) {
        return new Promise(async (resolve, reject) => {
      
            // Convert object into string
            const sendData = JSON.stringify(data);

            // Setup https agent options for our request
            const httpsAgent = new Agent({
                rejectUnauthorized: this.RejectUntrustedCert,
            });

            // Build request options object
            const authorization = Buffer.from(this.Username + ':' + this.#Password).toString('base64');
            const options = {
                agent: httpsAgent,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Lengh': sendData.length,
                    'User-Agent': 'HelloSMS.js/1.0',
                    'Authorization': 'Basic ' + authorization 
                }                
            };
      
            // Array for holding response data
            const buffer = [];
      
            // Perform actual request remote API
            const req = request(this.Endpoint,options, res => {
                res.on('data', d => {
                    //Append incomming data
                    buffer.push(d);
                });
                res.on('end', () => {
                    // All data received. Concat and return as object.
                    resolve(JSON.parse(buffer.join()));
                });
            });
            
            req.on('error', e => {
                // Uh-uh
                reject(e);
            });
            
            // Send the data for the request and terminate the request
            req.write(Buffer.from(sendData));
            req.end();
        });      
      }

    /**
     * Send a textmessage using the API
     * @method SendMessage
     * @name module:hellosms~SMSDispatcher#SendMessage
     * @public
     * @param {module:hellosms~SMSMessage} message 
     * @returns {Promise<SMSDispatchResult>} - Promise object with the response from the API
     */
    async SendMessage(message) {
        return new Promise(async (resolve, reject) => {

            // Create message object for the API
            var messageObject = {
                to: message.Recipient,
                from: this.Sender,
                subject: this.LoggingSubject,
                message: message.Text,
                delay: (!message.SendTime) ? undefined : parseInt(Math.floor(message.SendTime.getTime() / 1000).toFixed(0)),
                shortLinks: this.AutomaticallyShortenLinks,
                sendAPICallback: this.RequestCallback,
                testMode: this.TestMode
            }

            //Send request via HTTPs
            var response = await this.#httpsPost(messageObject)

            // Create a more user-friendly return object
            /**
             * @var responseObject
             * @type SMSDispatchResult
             */
            var responseObject = {
                status: response.statusText,
                results: [],
                message: {
                    originalText: response.orginalMessage,
                    processedText: response.messageIds[0].message,
                    encoding: response.encoding,
                    totalChars: response.textLength,
                    totalMessages: response.messageCount
                },
                sender: response.from,
                callbackEnabled: response.sendApiCallback,
                automaticallyShortenLinks: response.shortenLinks,
                delay: response.delay            
            }

            // Make the response a bit cleaner to handle for each message (avoid duplication)
            response.messageIds.forEach((/** @type Object */message)=>{

                responseObject.results.push({
                    apiId: message.apiMessageId,
                    recipient: message.to,
                    queued: (message.status===0)
                })
            })

            //Reject or resolve depending on API status. Return same object
            if (response.status==='success')
                resolve(responseObject)
            else
                reject(responseObject)
        });
    }
}

/**
 * Class to represent a single SMS message
 * @class SMSMessage
 * @property {string} Recipient - Recipient phone number
 * @property {string} Text - Text message to send
 * @property {Date|undefined} SendTime - Optional time to send the message 
 * @param {string} recipient 
 * @param {string} text 
 * @param {Date|undefined} [sendTime=undefined]
 */
class SMSMessage {

    Recipient;
    Text;
    /** @type {Date|undefined} */
    #sendTime;

    constructor(/** @type string */recipient,/** @type string */text,sendTime=undefined) {
        this.Text = text
        if (sendTime) this.SendTime = sendTime

        if (typeof recipient === 'string')
            this.Recipient = [recipient]
        else
            this.Recipient = recipient

    }

    set SendTime(value) {
        if (!value || !(typeof value.getMonth === 'function'))
            throw "DateTime datatype must be used as the SendTime value"

        this.#sendTime = value;
    }
    
    get SendTime() {
        return this.#sendTime;
    }

}

//@ts-ignore
export { SMSDispatcher, SMSMessage };
//@ts-ignore
export default SMSDispatcher;