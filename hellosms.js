const https = require('https');

module.exports.SMSDispatcher = class {
    LoggingSubject="HelloSMS.js"
    AutomaticallyShortenLinks=false;
    TestMode=false;
    RequestCallback=false;
    RejectUntrustedCert=false;
    Endpoint="https://api.hellosms.se/v1/sms/send/"
    Username;
    Sender;
    #Password;

    constructor(username,password,sender) {
        this.Sender = sender;
        this.Username = username;
        this.#Password = password;
    }

    set APIPassword(value) {
        this.#Password = value;
    }
    
    get APIPassword() {
        throw "Not allwoed to read password back"
    }    

    async #httpsPost(data) {
        return new Promise(async (resolve, reject) => {
      
            // Convert object into string
            const sendData = JSON.stringify(data);

            // Setup https agent options for our request
            const httpsAgent = new https.Agent({
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
            const req = https.request(this.Endpoint,options, res => {
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
            response.messageIds.forEach((message)=>{
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
 
module.exports.SMSMessage = class {

    Recipient;
    Text;
    #sendTime;

    constructor(recipient,text,sendTime=undefined) {
        this.Text = text
        if (sendTime) this.SendTime = sendTime

        if (typeof recipient === 'string')
            this.Recipient = [recipient]
        else
            this.Recipient = recipient

    }

    set SendTime(value) {
        if (!typeof value.getMonth === 'function')
            throw "DateTime datatype must be used as the SendTime value"

        this.#sendTime = value;
    }
    
    get SendTime() {
        return this.#sendTime;
    }

}
