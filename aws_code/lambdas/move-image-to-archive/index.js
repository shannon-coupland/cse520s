const aws = require('aws-sdk')

exports.handler = (event, context, callback) => {
  var s3 = new aws.S3({"region": process.env.AWS_REGION})
  
  var { bucketname, filename, alarm } = event
  var destination = ["archives", alarm ? 'alerts': 'rejected', filename.split('/')[1]]
  
  var copyParams = {
    Bucket: bucketname,
    CopySource: `${bucketname}/${filename}`,
    Key: destination.join('/')
  }

  // Move
  s3.copyObject(copyParams, (copyErr, res) => {
    if (copyErr) {
      let errMsg = ['Error while trying to copy image.',
                    'Function: [move-image-to-archive]',
                    `Copy Params: ${JSON.stringify(copyParams, null, 2)}`,
                    `Event: ${JSON.stringify(event, null, 2)}`,
                    `Error:${copyErr.stack}`]
      callback(errMsg.join('\n'), null)
    } else {
      // Delete from old bucket
      let delParams = {Bucket: bucketname, Key: filename}
      s3.deleteObject(delParams, (delErr, res) => {
        if (delErr) {
          let errMsg = ['Error while trying to delete image.',
                        'Function: [move-image-to-archive]',
                        `Delete Params: ${JSON.stringify(delParams, null, 2)}`,
                        `Event: ${JSON.stringify(event, null, 2)}`,
                        `Error:${delErr.stack}`]
          callback(errMsg.join('\n'), null)
        } else {
          let msg = `Image saved to ${destination.join('/')}`
          callback(null, msg)
        }
      })
    }
  })
}