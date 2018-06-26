import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as secureCompare from 'secure-compare';
import TwitterClient from './twitter';

admin.initializeApp(functions.config().firebase);

const isValid = (req, res): boolean => {
  return req.query && req.query.key && secureCompare(req.query.key, functions.config().cron.key);
}

const getAllUsers = async (users = [], nextPageToken = undefined) => {
  return admin.auth().listUsers(1000, nextPageToken).then(async(result) => {
    const ret = users.concat(result.users.map(v => v.uid));
    if (result.pageToken) return await getAllUsers(ret, result.pageToken);
    return ret;
  });
}

export const deleteTweets = functions.https.onRequest(async (req, res) => {
  if(!isValid(req, res)){
    res.status(403).send("The req is forbidden.");
    return null;
  }
  try {
    const users = (await getAllUsers())
    for(const uid of users){
      const client = new TwitterClient(uid);
      const tweets = await client.searchTweet("from:takanakahiko since:2018-06-20 until:2018-06-21");
      tweets.forEach( async v => { await client.delete(v) } )
    }
    res.send('success');
  } catch(e) {
    console.log(e);
    res.send('fail');
  }
  return null;
});