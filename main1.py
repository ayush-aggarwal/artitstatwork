#!/usr/bin/python
import cgi,cgitb
import json
cgitb.enable()
print "Content-Type: text/html\n"
import urllib2
fs=cgi.FieldStorage()
placeid=fs.getvalue("placeid")
data=json.loads(urllib2.urlopen("https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeid+"&key=AIzaSyByr2a68BCD-8sqkVlxKr3nyVns_7HqQWE").read())
print json.dumps(data)
