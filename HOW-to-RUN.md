## Starting Motion and Arming/Disarming System
* Turn on the Pi. Open two terminal windows on your Pi (via SSH or on the Pi itself) and navigate to the pi_code folder within this repository.
* On the first terminal window, start Motion using the command motion -c motion.aws.conf
* On the second terminal window, start the Python script to toggle arming/disarming the system using the command python buzzer_motion.py
* The system is now disarmed. To arm it, press the toggle button - two long beeps will play from the buzzer.
* To disarm the system, press the toggle button while the system is armed - three short beeps will play from the buzzer.
* While the system is armed, if motion is detected by the camera, the buzzer will play a long droning beep until the motion ends. After the motion ends, one snapshot from the motion period will be sent to AWS and processed.
* If you are getting too many "false positives" for detecting motion, or if the system doesn't detect motion when it should, you can tweak values in the motion.aws.config file. See https://motion-project.github.io/motion_config.html#snapshot_interval for a description of all available configuration options.

## Manual Testing (AWS Rekognition)
Once you have set up the AWS code, with all node modules, S3 buckets, etc you can test the code manually. If you have the raspberry Pi and camera set up, you can test by just stepping in front of the camera and skipping to checking the expected folder steps. 

* Upload test image into the 'upload' folder
* Let functions run (should be less than 30s)
* Check the folder you expect the image to be moved to
* Alerts: If the image contains a person not in the known catalogue
* Rejected: If the image contains a known person, or an non-human object

## Website
If the the AWS EC2 instance is set up properly then the website will be active on your instance's Public IPv4 address at all times.
To activate the server you run the command "node index.js" when in the folder containing that file on the instance.
Now when the hardware is set up if you go to the Video Page you will be able to see the live camera feed, and if you go to the images page you will be able to see all images that have a detected intruder.
