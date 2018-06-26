import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import * as Twitter from 'twitter'

export default class TwitterClient {
    private client
    private isGettedToken
    private uid

    constructor(uid: String) {
        this.uid = uid;
        this.isGettedToken = false;
    }

    private async prepareClient(): Promise<void> {
        if (!this.isGettedToken) {
            const db = admin.database()
            const basePath = '/credencials/' + this.uid;
            const acccessToken = (await db.ref(basePath + '/accessToken').once('value')).val();
            const secret = (await db.ref(basePath + '/secret').once('value')).val();
            this.client = new Twitter({
                consumer_key: functions.config().twitter.consumer_key,
                consumer_secret: functions.config().twitter.consumer_secret,
                access_token_key: acccessToken,
                access_token_secret: secret
            });
            this.isGettedToken = true;
        }
    }

    async post(text): Promise<String> {
        await this.prepareClient();
        const resp = await this.client.post('statuses/update', { status: text });
        return JSON.stringify(resp);
    }

    async searchTweet(queryArg, tweets = [], max_id = null): Promise<Array<String>> {
        await this.prepareClient();
        const param = { q: queryArg, result_type:"mixed", max_id: max_id }
        return this.client.get('search/tweets', param).then( async searchData => {
            const ret = tweets.concat( searchData.statuses.map(v=>v.id_str) )
            if (searchData.search_metadata && searchData.search_metadata.next_results) {
                const maxId = searchData.search_metadata.next_results.match(/\?max_id=(\d*)/);
                if(maxId[1] === null) return ret;
                return await this.searchTweet(queryArg, ret, maxId[1]);
            }
            return ret;
        });
    }

    async delete(tweetId) : Promise<void>{
        await this.prepareClient();
        return this.client.post('statuses/destroy/' + tweetId , {});
    }

}