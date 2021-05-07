Once you have set up the AWS code, with all node modules, S3 buckets, etc you can test the code manually. If you have the raspberry Pi and camera set up, you can test by just stepping in front of the camera and skipping to checking the expected folder steps. 

## Manual Testing
* Upload test image into the 'upload' folder
* Let functions run (should be less than 30s)
* Check the folder you expect the image to be moved to
* Alerts: If the image contains a person not in the known catalogue
* Rejected: If the image contains a known person, or an non-human object
