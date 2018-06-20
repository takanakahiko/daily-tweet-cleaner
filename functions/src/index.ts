import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import TwitterClient from './twitter';
import * as secureCompare from 'secure-compare';

admin.initializeApp(functions.config().firebase);

const isValid = (req, res): boolean => {
  return req.query && req.query.key && secureCompare(req.query.key, functions.config().cron.key);
}

export const deleteTweets = functions.https.onRequest(async (req, res) => {
  console.log(functions.config());
  if(!isValid(req, res)){
    res.status(403).send("The req is forbidden.");
    return null;
  }
  try {
    const client = new TwitterClient("");
    const resp = await client.post("test+"+Math.random());
    res.send('success:'+resp);
  } catch(e) {
    console.log(e);
    res.send('fail');
  }
  return null;
});