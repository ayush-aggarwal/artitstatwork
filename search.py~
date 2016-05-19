#!/usr/bin/python
import cgi,cgitb
import json
cgitb.enable()
print "Content-Type: text/html\n"
import urllib2
fs=cgi.FieldStorage()
location=fs.getvalue("location")
data=json.loads(urllib2.urlopen("http://maps.googleapis.com/maps/api/geocode/json?address="+location+"&sensor=true").read())
print json.dumps(data)
