import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import * as Twitter from 'twitter'

export default class TwitterClient {
    private client
    private isGettedToken
    private uid

    constructor(uid :String) {
        this.uid = uid;
        this.isGettedToken = false;
    }

    private async prepareClient(): Promise<void>{
        if( !this.isGettedToken ){
            const db = admin.database()
            const basePath = '/credencials/'+this.uid;
            const acccessToken = (await db.ref(basePath+'/accessToken').once('value')).val();
            const secret = (await db.ref(basePath+'/secret').once('value')).val();
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
        const resp = await this.client.post('statuses/update', { status: text } );
        return JSON.stringify(resp);
    }
}