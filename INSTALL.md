## Hardware
To install all necessary hardware/software on the Raspberry Pi:
1. Connect Pi Camera V2, piezoelectric buzzer, pushbutton, and resistors to the Pi per block_diagram.jpg within this repo's pi_code folder
2. Use the Raspberry Pi Imager to install the most recent version of Raspbian OS on a 32GB SD card, then insert SD card into Raspberry Pi 3 B+, connect Pi to an external display/keyboard/mouse, and complete setup as prompted
3. Install Motion on the Raspberry Pi per these instructions: https://www.bouvet.no/bouvet-deler/utbrudd/building-a-motion-activated-security-camera-with-the-raspberry-pi-zero. Use the Motion .deb file pi_buster_motion_4.3.2-1_armhf.deb.
4. Clone this repository onto the Raspberry Pi, and make changes to the code within the pi_code folder as follows:
* In button_motion.py, update all calls to wget to include your own Pi's IP address instead of 192.168.0.120
* In config.json, set all fields to your own credentials for your AWS with s3 buckets (do this after setting up AWS Rekognition and buckets)
* In mongodb.py, change the MongoClient URI to your own MongoDB URI (after setting up MongoDB)

## AWS Rekognition
After initially setting up Rekognition per AWS's instructions, individual settings for the lambda functions are located in their respective folders. Each lambda function will require a new permissions policy for it to ensure the functions are accessing the correct functions. Once set up, you can copy and paste the lambda function code in.

## AWS Website
Start an Ubuntu EC2 Instance.
Set up instance to take a client and server and run client via nginx.
Download files from the site images folder and run "npm install" from server and client folders to get the required node modules.
Use npm run build in the client folder after filling in your instance and MongoDB information to get the client's build.
Upload the build to a deploy folder where nginx is directed so it will run.
Uplaod server code to server folder on instance.
See how to run for information on how to use the website from this point.
