#!/usr/bin/python
import cgi,cgitb
import json
cgitb.enable()
print "Content-Type: text/html\n"
import urllib2
fs=cgi.FieldStorage()
location=fs.getvalue("location")
data=json.loads(urllib2.urlopen("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+location+"&radius=500&key=AIzaSyByr2a68BCD-8sqkVlxKr3nyVns_7HqQWE").read())
print json.dumps(data)

