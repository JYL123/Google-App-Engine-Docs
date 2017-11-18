# Google-App-Engine-Docs (Node.js)

## Pub/Sub Section

### Logic 

Push `message` to `topic`(an end point), `topic` picks up the message (or you can write functions to process the language, etc), send the processed message to `subscription`(an end point).
   * [Tutorial 1](https://www.youtube.com/watch?v=sATG0OfdP4g&t=1s)
   * [Tutorial 2](https://www.youtube.com/watch?v=g0dN8Hkh5H8)

### Sequences 
1. Navagate to `pub/sub` page, and create a `topic` 
2. Create a `new subscription` for the topic you just created
    * [how `topic` and `subscription` interact with each other](https://cloud.google.com/functions/docs/tutorials/pubsub)
3. Navigate to your `src` folder and find your project
4. Create a `app.yaml` file, and specify your environment variables
````
# [START app_yaml]
runtime: nodejs
env: flex

# [START env]
env_variables:
  PUBSUB_TOPIC: mytopic
  # This token is used to verify that requests originate from your
  # application. It can be any sufficiently random string.
  PUBSUB_VERIFICATION_TOKEN: mytoken
# [END env]
# [END app_yaml]
````
5. Read the sample code to get you started:
   * [Sample code on github](https://github.com/GoogleCloudPlatform/nodejs-docs-samples/tree/master/appengine)
   * [Sample code explaination](https://cloud.google.com/appengine/docs/flexible/nodejs/writing-and-responding-to-pub-sub-messages#prerequisites)
6. You are good to go!
7. Last step before you go:
```
gcloud app deploy
```
### Send your message to Pub/Sub service via endpoint
1. After you deploy your app on gcloud, you are supposed to receive your app endoint. 
2. Push message locally to your topic with command: `http POST "https://[Your-Project-ID].appspot.com/pubsub/push?token=[Your-Verification-Token]" < sample_message.json` (sample_message.json is the message you want to push which should be on your current directory).
   * [Download httpie](https://github.com/jakubroztocil/httpie#macos)
3. The reply from your command line/terminal should look like this:
```
HTTP/1.1 200 OK
Alt-Svc: hq=":443"; ma=2592000; quic=51303431; quic=51303339; quic=51303338; quic=51303337; quic=51303335,quic=":443"; ma=2592000; v="41,39,38,37,35"
Content-Length: 0
Date: Sat, 18 Nov 2017 16:16:33 GMT
Server: nginx
Via: 1.1 google
X-Powered-By: Express
```

