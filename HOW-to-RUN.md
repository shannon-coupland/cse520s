Once you have set up the AWS code, with all node modules, S3 buckets, etc you can test the code manually. If you have the raspberry Pi and camera set up, you can test by just stepping in front of the camera and skipping to checking the expected folder steps. 

## Manual Testing
* Upload test image into the 'upload' folder
* Let functions run (should be less than 30s)
* Check the folder you expect the image to be moved to
* Alerts: If the image contains a person not in the known catalogue
* Rejected: If the image contains a known person, or an non-human object

## Website
If the the AWS EC2 instance is set up properly then the website will be active on your instance's Public IPv4 address at all times.
To activate the server you run the command "node index.js" when in the folder containing that file on the instance.
Now when the hardware is set up if you go to the Video Page you will be able to see the live camera feed, and if you go to the images page you will be able to see all images that have a detected intruder.
