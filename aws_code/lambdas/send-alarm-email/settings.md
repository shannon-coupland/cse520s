## Environment variables
  - MAILFROM

        The sender email address. Which you will need to define in the SES console on the AWS site. It will need to be one of the verified addresses so, yours.

  - MAILTO

        The email addresses that will be getting the alarm emails. These will also have to be verified emails through the SES console. 
        If using multiple email addresses seperate them with a pipe '|' like:
          one@email.com|two@email.com

## Permissions
  ### Create a role with the following policies:

      AmazonS3ReadOnlyAccess
      AmazonSESFullAccess
      AWSLambdaBasicExecutionRole

## Note: You can use this role for both of the lambdas that send emails.