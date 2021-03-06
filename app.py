#!/usr/bin/env python
from bottle import route, error, post, get, run, static_file, abort, redirect, response, request, template
from os import environ as env
from model import main
from model import main1
from model import search
import json,sys,urlparse
@route('/index.html')
def index():
	redirect("/")

@route('/')
def home():
	return template('static/index.html',name=request.environ.get('REMOTE_ADDR'))

@post('/cgi-bin/artistatwork/main.py')
def m():
	data = request.body.readline()
	if not data:
		abort(400, 'No data received')
	else:
		entity = dict(urlparse.parse_qs(data))
		location = entity['location'][0]
		return json.dumps(main.main(location))
		
		
@post('/cgi-bin/artistatwork/main1.py')
def m1():
	data = request.body.readline()
	if not data:
		abort(400, 'No data received')
	else:
		entity = dict(urlparse.parse_qs(data))
		placeid = entity['placeid'][0]
		return json.dumps(main1.main(placeid))
		

@post('/cgi-bin/artistatwork/search.py')
def m2():
	data = request.body.readline()
	if not data:
		abort(400, 'No data received')
	else:
		entity = dict(urlparse.parse_qs(data))
		location = entity['location'][0]
		return json.dumps(search.main(location))


# Static Routes
@get('/static/<filename:re:.*\.js>')
def javascripts(filename):
    return static_file(filename, root='static/js')

@get('/static/<filename:re:.*\.css>')
def stylesheets(filename):
	return static_file(filename, root='static/css')

@get('/static/<filename:re:.*\.(jpg|png|gif|ico)>')
def images(filename):
    return static_file(filename, root='static/img')

@get('/static/<filename:re:.*\.(eot|ttf|woff|woff2|svg)>')
def fonts(filename):
	return static_file(filename, root='static/fonts')

@get('/static/<filename:re:.*\.(json)>')
def json_static(filename):
	return static_file(filename, root='static/json')

@get('/fonts/<filename:re:.*\.(eot|ttf|woff|woff2|svg)>')
def fonts(filename):
	return static_file(filename, root='static/fonts')

run(host='0.0.0.0', port=sys.argv[1], debug=True)
