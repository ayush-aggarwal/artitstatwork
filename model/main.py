#!/usr/bin/python
import urllib2,json
def main(location):
	data=json.loads(urllib2.urlopen("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+location+"&radius=500&key=AIzaSyByr2a68BCD-8sqkVlxKr3nyVns_7HqQWE").read())
	return data

