#!/usr/bin/python
import json
import urllib2
def main(placeid):
	data=json.loads(urllib2.urlopen("https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeid+"&key=AIzaSyByr2a68BCD-8sqkVlxKr3nyVns_7HqQWE").read())
	return data
