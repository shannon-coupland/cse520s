/***
 * This was more or less straight from the example code from AWS on how to upload to an S3 bucket.
 */

const AWS = require('aws-sdk')
const path = require('path')
const fs = require('fs')

s3 = new AWS.S3({apiVersion: '2006-03-01'})

params = {Bucket: process.argv[2], Key: '', Body: ''}
var filePath = process.argv[3]

var fileStream = fs.createReadStream(filePath)
fileStream.on('error', function(err) {
  console.log('Error reading file:', err)
})

params.Body = fileStream
params.Key = `uploads/${path.basename(filePath)}`
// params.ACL = 'public-read'

s3.upload(params, (err, data) => {
  if (err) {
    console.log('Error uploading file:', err)
  } else {
    console.log('Upload Successful', data.Location)
  }
})