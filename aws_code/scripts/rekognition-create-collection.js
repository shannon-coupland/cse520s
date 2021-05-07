const aws = require('aws-sdk')
var rekognition = new aws.Rekognition({'region': 'us-east-2'})
var collection_id = 'approvedpeople'
// // Create a Collection
// rekognition.createCollection({CollectionId: collection_id}, (err, res) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(res)
//   }
// })


// Add Faces to Collection
var faces = ['approved-faces/headshot.jpg', 'approved-faces/shannon.jpg']
try {
  for (f in faces) {
    let params = {
      CollectionId: collection_id,
      Image: {
        S3Object: {
          Bucket: 'pdasc-files',
          Name: faces[f]
        }
      }
    }
    rekognition.indexFaces(params, (err, res) => {
      if (err) {
        console.log("indexFaces", `face: ${faces[f]}`, err)
      } else {
        console.log(res)
      }
    })
  }
} catch (loopErr) {
  console.log("loopErr", loopErr)
}

// // List the faces in collection
// rekognition.listFaces({CollectionId: collection_id}, (err, res) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(JSON.stringify(res, null, 2))
//   }
// })

// // Compare a Face to those in the Collection
// var params = {
//   CollectionId: collection_id,
//   FaceMatchThreshold: 95,
//   Image: {
//     S3Object: {
//       Bucket: 'pdasc-files',
//       Name: 'headshot.jpg'
//     }
//   }
// }

// rekognition.searchFacesByImage(params, (err, res) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(JSON.stringify(res, null, 2))
//   }
// })