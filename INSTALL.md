
Individual settings for the lambda functions are located in their respective folders. Each lambda function will require a new permissions policy for it to ensure the functions are accessing the correct functions. 

## AWS Website
Start an Ubuntu EC2 Instance.
Set up instance to take a client and server and run client via nginx.
Download files from the site images fodler and run "npm install" from server and client fodlers to get the required node modules.
Use npm run build in the client folder after filling in your instance and MongoDB information to get the client's build.
Upload the build to a deploy folder where nginx is directed so it will run.
Uplaod server code to server folder on instance.
See how to run for information on how to use the website from this point.
