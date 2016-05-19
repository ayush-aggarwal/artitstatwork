#!/usr/bin/python
import json
import urllib2
def main(location):
	data=json.loads(urllib2.urlopen("http://maps.googleapis.com/maps/api/geocode/json?address="+location+"&sensor=true").read())
	return data
