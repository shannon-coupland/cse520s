exports.handler = (event, context, callback) => {
  const aws = require('aws-sdk')
  var rekognition = new aws.Rekognition()
  var { bucketname, filename } = event

  var params = {
    Image: {
      S3Object: {
          Bucket: bucketname,
          Name: filename
        }
      },
    MaxLabels: 100.0,
    MinConfidence: 75.0
  }
  
  // List of labels that can potentially trigger an alarm
  let triggers = ['Apparel', 'Clothing', 'Costume', 'Face', 'Female', 'Human', 'Male', 'Man', 'People', 'Person', 'Portrait', 'Selfie', 'Woman']
  
  // Detect Labels for the Image
  var req = rekognition.detectLabels(params, (err, res) => {
    if (err) {
      let errMsg = ['Error detecting labels.', 
                     'Function: [process-image]', 
                     `Rekognition Params: ${JSON.stringify(params, null, 2)}`,
                     `Event: ${JSON.stringify(event, null, 2)}`,
                     `Error: ${err.stack}`]
      callback(errMsg.join('\n'), null)
    } else {
      // If it didn't cause an error when detecting labels then compare the returned labels to list of triggers
      try {
        let labels = Object.values(res.Labels).filter(l => {
          return triggers.indexOf(l.Name) > -1
        })
        // If any of the labels made it through the filter then it's probably a person. 
        if (labels.length) {
          labels = labels.map(l => {
            return {"Label": l.Name, "Confidence": l.Confidence}
          })
          // Since it's a person, we want to check if that person is in the collection of safe faces.
          let searchParams = {
            CollectionId: process.env.COLLECTION_ID,
            FaceMatchThreshold: 95,
            Image: {
              S3Object: {
                Bucket: bucketname,
                Name: filename
              }
            }
          }
          rekognition.searchFacesByImage(searchParams, (searchErr, res) => {
            if (err) {
              let errMsg = ['Error searching with collection.', 
                            'Function: [process-image]', 
                            `Rekognition Params: ${JSON.stringify(searchParams, null, 2)}`,
                            `Event: ${JSON.stringify(event, null, 2)}`,
                            `Error: ${err.stack}`]
              callback(errMsg.join('\n'), null)
            } else {
              // If we find matches, then don't trip the alarm. 
              if (res.FaceMatches.length) {
                console.log("Nah, they're cool.")
                callback(null, Object.assign({"alarm": "false"}, event))  
              } else {
              // Otherwise, this person is not in the list... trip the alarm.
                console.log("I don't know who this. Call the cops!")
                callback(null, Object.assign({"alarm": "true", "labels": labels}, event))
              }
            }
          })
        } else {
      // If none of the labels made it through the filter, then it's probably not a person.
          callback(null, Object.assign({"alarm": "false"}, event))
        }
      } catch (labelsErr) {
        let errMsg = ['Error assesing labels.', 
                      'Function: [process-image]', 
                      `Event: ${JSON.stringify(event, null, 2)}`,
                      `Error: ${labelsErr.stack}`]
        callback(errMsg.join('\n'), null)
      }
    }
  })
}