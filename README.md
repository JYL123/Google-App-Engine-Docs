# Google-App-Engine-Docs (Node.js)

## Logic 

Push `message` to `topic`(an end point), `topic` picks up the message (or you can write functions to process the language, etc), send the processed message to `subscription`(an end point).

## Sequences 
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
