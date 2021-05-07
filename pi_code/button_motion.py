import RPi.GPIO as GPIO
from time import sleep
import os

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

buzzer=23
button=15

GPIO.setup(buzzer, GPIO.OUT)
GPIO.setup(button, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

# State of Motion - 1 is on (start), 0 is off (paused)
os.system("wget http://192.168.0.120:8080/0/detection/pause")
motion_state = 0

while True:
    # Disarm Motion
    if (GPIO.input(button) == GPIO.HIGH and motion_state == 1):
        os.system("wget http://192.168.0.120:8080/0/detection/pause")
        motion_state = 0
        GPIO.output(buzzer, GPIO.HIGH)
        sleep(0.2)
        GPIO.output(buzzer, GPIO.LOW)
        sleep(0.3)
        GPIO.output(buzzer, GPIO.HIGH)
        sleep(0.2)
        GPIO.output(buzzer, GPIO.LOW)
        sleep(0.3)
        GPIO.output(buzzer, GPIO.HIGH)
        sleep(0.2)
        GPIO.output(buzzer, GPIO.LOW)
        sleep(0.3)
        os.system("rm pause*")

    # Arm Motion
    elif (GPIO.input(button) == GPIO.HIGH and motion_state == 0):
        os.system("wget http://192.168.0.120:8080/0/detection/start")
        motion_state = 1
        GPIO.output(buzzer, GPIO.HIGH)
        sleep(1)
        GPIO.output(buzzer, GPIO.LOW)
        sleep(0.3)
        GPIO.output(buzzer, GPIO.HIGH)
        sleep(1)
        GPIO.output(buzzer, GPIO.LOW)
        sleep(0.3)
        os.system("rm start*")
