const aws = require('aws-sdk')

exports.handler = (event, context, callback) => {
    var ses = new aws.SES({'region': process.env.AWS_REGION})
    var s3 = new aws.S3({'region': process.env.AWS_REGION})
    
    var { bucketname, filename, labels } = event
    
    var recipientsList = process.env.MAILTO.split('|')
    
    var listitems = labels.map(item => (
        `<li>${item.Label} with a confidence of ${item.Confidence}</li>`
    ))
    
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
                      <div style="background-color:lightgrey;padding:0 20px 0 20px;">
                          <div style="padding:20px;background-color:#f0f0f0;">
                            <div style="font-size:xx-large;font-weight:bold;">Alarm Triggered</div>
                            <div style="font-size:x-large;margin:-10px 0 -10px 0;">An image triggered the alarm with the following parameters:</div>
                            <div style="background-color:#f7f7f7;padding:0 10px 0 10px;margin:-10px 0 -10px 0;">
                              <ul style="font-size:large;margin:-16px 0 -16px 0;">
                                ${listitems.join('')}
                              </ul>
                            </div> 
                            <div style="font-size:x-large;margin:-10px 0 -10px 0;">Image:</div> 
                            <div style="background-color:#f7f7f7;padding:0 10px 0 10px;margin:-10px 0 -10px 0;">
                                <img src="https://${bucketname}.s3.amazonaws.com/${filename.replace('uploads/', '')}"/>
                            </div>
                          </div>
                      </div>
                    </pre>`
                },
                Text: { 
                    Charset: "UTF-8",
                    Data: JSON.stringify(event)}
            },
            Subject: { 
                Charset: "UTF-8",
                Data: "Person Alarm!!"
            },
        },
        Source: process.env.MAILFROM,
    }
    
    ses.sendEmail(params, (err, res) => {
        if (err) {
            let errMsg = ['Error sending alarm email',
                          'Function: [send-alarm-email]',
                          `Email Params: ${JSON.stringify(params, null, 2)}`,
                          `Event: ${JSON.stringify(event, null, 2)}`,
                          `Error:${err.stack}`]
            callback(errMsg.join('\n'), null)
        } else {
            console.log(`Email sent to ${recipientsList}`)
            callback(null, event)
        }
    })
}