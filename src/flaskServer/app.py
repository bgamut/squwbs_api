
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template,redirect,url_for,request,jsonify
from flask_cors import CORS
import requests
import json
app = Flask(__name__)
CORS(app)
@app.route('/')
def hello_world():
    return 'Hello from Flask!'

@app.route('/oauth')

def oauth():
    print(request.args)
    code = str(request.args.get('code'))
    url = 'https://kauth.kakao.com/oauth/token'
    # payload = "grant_type=authorization_code&client_id=3f8eaabc9161b6f392c0999b7fce6026&redirect_uri=https://squwbs-252702.appspot.com&client_secret=Rkqe5P8ctpl7rccHg2DP4RcqYog0yZte&code=" +code
    payload = "grant_type=refresh_token&client_id=3f8eaabc9161b6f392c0999b7fce6026&redirect_uri=https://squwbs-252702.appspot.com&client_secret=Rkqe5P8ctpl7rccHg2DP4RcqYog0yZte&code=" +code
    headers={
        'Content-Type':'application/x-www-form-urlencoded'
    }
    response =requests.request("POST",url, data=payload, headers=headers)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    access_token=response.text
    return access_token

@app.route('/kakao')

def kakao():
    print(request.args)
    token = str(request.args.get('token'))
    url = 'https://kapi.kakao.com/v1/api/talk/friends'
    # payload = "grant_type=authorization_code&client_id=3f8eaabc9161b6f392c0999b7fce6026&redirect_uri=https://squwbs-252702.appspot.com&client_secret=Rkqe5P8ctpl7rccHg2DP4RcqYog0yZte&code=" +code
    # payload = "grant_type=refresh_token&client_id=3f8eaabc9161b6f392c0999b7fce6026&redirect_uri=https://squwbs-252702.appspot.com&client_secret=Rkqe5P8ctpl7rccHg2DP4RcqYog0yZte&code=" +code
    headers={
        'Content-Type':'application/x-www-form-urlencoded',
        'Cache-Control':'no-cache',
        'Authorization':'Bearer '+token
    }
    response =requests.request("GET",url, headers=headers)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    print(response)
    access_token=response.text
    return access_token