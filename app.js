/**
 * Created by dar on 12/4/17.
 */

const sdk = require('./sdk.js');

var options = {
    appId: 'appId',
    groupId: 'groupId',
    deviceId: 'deviceId',
    username: 'username',
    password: 'password'
};

var mySdk = sdk(options);

if(mySdk != null){
    mySdk.begin();

}

function onConnect() {

}

function onMessage(message) {
    console.log(messsage);
}




