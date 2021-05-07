const aws = require('aws-sdk')

exports.handler = (event, context, callback) => {
    var ses = new aws.SES({'region': process.env.AWS_REGION})
    
    var recipientsList = process.env.MAILTO.split('|')
    var params = {
        Destination: { 
            ToAddresses: recipientsList
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                        <pre>
                            <div style="background-color:lightgrey;padding:0 20px 0 ;">
                                <div style="padding:20px;background-color:#f0f0f0;">
                                    <div style="font-size:xx-large;fon-weight:bold;">Error</h1>
                                    <div style="background-color:#f7f7f7;padding:0 10px 0 10px;">
                                        <div style="font-size:large">${JSON.stringify(event)}</div>
                                    </div>  
                                </div>
                            </div>
                        </pre>`
                },
                Text: { 
                    Charset: "UTF-8",
                    Data: JSON.stringify(event, null, 2)
                }
            },
            Subject: { 
                Charset: "UTF-8",
                Data: "Error Alert"
            },
        },
        Source: process.env.MAILFROM,
    }
    
    ses.sendEmail(params, (err, res) => {
        if (err) {
            let errMsg = ['Error sending alarm email',
                          'Function: [send-error-email]',
                          `Email Params: ${JSON.stringify(params, null, 2)}`,
                          `Event: ${JSON.stringify(event, null, 2)}`,
                          `Error:${err.stack}`]
            callback(errMsg.join('\n'), null)
        } else {
            callback(null, `Email sent to ${recipientsList}`)
        }
    })
        
};
