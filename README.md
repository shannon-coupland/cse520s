# PDASC (Person-Detecting Affordable Security Camera)
*Team Members: Tommy Keating, Abby Magee, Shannon Coupland*

<p>This project was created for Washington University in St. Louis's CSE520S Real-Time Systems course. It features a Motion-powered motion detection security camera that sends images up to AWS Rekognition for person detection and facial recognition, which alerts the security camera owner when an unrecognized person is detected. A React app hosted on AWS EC2 shows a livestream from the camera, as well as a collection of past snapshots with unrecognized people.</p>

### Hardware Required
* Raspberry Pi 3 B+ (with most recent Raspbian OS installed)
* Pi Camera V2
* Piezoelectric buzzer
* Button
* Breadboard and jumper wires
* 220 ohm resistors

## AWS Credentials
Our code uses us-east-2 region. Feel free to change the region in the code to whatever region you are in. 
## S3 Bucket
Bucket will needs two folders : "/upload" and "/archives".
Directly under the "/archives" folder, create the "/alerts" and "/rejected" sub-folder.
In the "Permissions->Bucket Policy" tab for your S3 Bucket, set up the following Bucket Policy:
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": [
                "s3:Get*",
                "s3:List*"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        }
    ]
}
