/**
 * <p>Module for sending SMS messages via the HelloSMS API</p>
 */
declare module "hellosms" {
    /**
     * <p>Results of dispatching a message, contains a status, results for each recipient, message details, sender, callback status, link shortening status and delay</p>
     * @property status - <p>The status of the API request</p>
     * @property results - <p>Array of results for each recipient</p>
     * @property message - <p>Object with message details</p>
     * @property message.originalText - <p>The original text message</p>
     * @property message.processedText - <p>The processed text message</p>
     * @property message.encoding - <p>The encoding used for the message</p>
     * @property message.totalChars - <p>The total number of characters in the message</p>
     * @property message.totalMessages - <p>The total number of messages in the message</p>
     * @property sender - <p>The sender of the message</p>
     * @property callbackEnabled - <p>If a callback was requested</p>
     * @property automaticallyShortenLinks - <p>If links were automatically shortened</p>
     * @property delay - <p>The delay in seconds before the message is sent</p>
     */
    type SMSDispatchResult = {
        status: string;
        results: SMSMessageResult[];
        message: {
            originalText: string;
            processedText: string;
            encoding: string;
            totalChars: number;
            totalMessages: number;
        };
        sender: string;
        callbackEnabled: boolean;
        automaticallyShortenLinks: boolean;
        delay: number;
    };
    /**
     * <p>A single result of a message dispatch</p>
     * @property apiId - <p>The API ID for the message</p>
     * @property recipient - <p>The recipient of the message</p>
     * @property queued - <p>If the message was queued for sending</p>
     */
    type SMSMessageResult = {
        apiId: string;
        recipient: string;
        queued: boolean;
    };
    /**
     * <p>Class for sending SMS messages via the HelloSMS API</p>
     * @property LoggingSubject - <p>The sender of the message as logged in the API</p>
     * @property AutomaticallyShortenLinks - <p>Automatically shorten links in the message</p>
     * @property TestMode - <p>Enable test mode for the API</p>
     * @property RequestCallback - <p>Request a callback from the API</p>
     * @property RejectUntrustedCert - <p>Reject untrusted certificates</p>
     * @property Endpoint - <p>The API endpoint to use</p>
     * @property Username - <p>The username for the API</p>
     * @property Password - <p>The password for the API</p>
     * @property Sender - <p>The sender of the message</p>
     * @param username - <p>The username for the API</p>
     * @param password - <p>The password for the API</p>
     * @param sender - <p>The sender of the message</p>
     */
    class SMSDispatcher {
        constructor(username: string, password: string, sender: string);
        /**
         * <p>Send a textmessage using the API</p>
         * @returns <ul>
         * <li>Promise object with the response from the API</li>
         * </ul>
         */
        public SendMessage(message: module): Promise<SMSDispatchResult>;
        /**
         * <p>The sender of the message as logged in the API</p>
        */
        LoggingSubject: string;
        /**
         * <p>Automatically shorten links in the message</p>
        */
        AutomaticallyShortenLinks: boolean;
        /**
         * <p>Enable test mode for the API</p>
        */
        TestMode: boolean;
        /**
         * <p>Request a callback from the API</p>
        */
        RequestCallback: boolean;
        /**
         * <p>Reject untrusted certificates</p>
        */
        RejectUntrustedCert: boolean;
        /**
         * <p>The API endpoint to use</p>
        */
        Endpoint: string;
        /**
         * <p>The username for the API</p>
        */
        Username: string;
        /**
         * <p>The password for the API</p>
        */
        Password: string;
        /**
         * <p>The sender of the message</p>
        */
        Sender: string;
    }
    var responseObject: SMSDispatchResult;
    /**
     * <p>Class to represent a single SMS message</p>
     * @property Recipient - <p>Recipient phone number</p>
     * @property Text - <p>Text message to send</p>
     * @property SendTime - <p>Optional time to send the message</p>
     */
    class SMSMessage {
        constructor(recipient: string, text: string, sendTime?: Date | undefined);
        /**
         * <p>Recipient phone number</p>
        */
        Recipient: string;
        /**
         * <p>Text message to send</p>
        */
        Text: string;
        /**
         * <p>Optional time to send the message</p>
        */
        SendTime: Date | undefined;
    }
}

