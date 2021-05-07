#!/usr/bin/python3

from pymongo import MongoClient
import sys, getopt

client = MongoClient("insert-MongoDB-URI-here")
db = client.get_database('ImagesDB')
results = db.images

x = str((sys.argv)[1]).split('/')
filename = x[-1]
date = filename[3:7] + "-" + filename[7:9] + "-" + filename[9:11]

new_image = {
    'image': filename,
    'date' : date,
    'known': False
}

results.insert_one(new_image)
