Once you have set up the AWS code, with all node modules, S3 buckets, etc. 

## Manual Testing
* Upload test image into the 'upload' folder
* Let functions run (should be less than 30s)
* Check the folder you expect the image to be moved to
* Alerts: If the image contains a person not in the known catalogue
* Rejected: If the image contains a known person, or an non-human object
