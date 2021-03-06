#Libraries
import RPi.GPIO as GPIO
from time import sleep

#Disable warnings
GPIO.setwarnings(False)

#Select GPIO mode
GPIO.setmode(GPIO.BCM)

#Set buzzer - pin 23 as output
buzzer = 23 
GPIO.setup(buzzer,GPIO.OUT)

#Stop buzzer
GPIO.output(buzzer,GPIO.LOW)
