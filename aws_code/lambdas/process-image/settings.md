## Environment variables
  - COLLECTION_ARN
  
        The collection arn may not be needed but it's probably a good idea to save it.

  - COLLECTION_ID
        
        You'll define this when you create the collection. It's just a name, like "safefaces"

## Permissions
  ### Create a role with the following policies:

      AmazonRekognitionReadOnlyAccess
      AmazonS3ReadOnlyAccess
      AWSLambdaBasicExecutionRole
