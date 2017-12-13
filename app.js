/**
 * Created by dar on 12/4/17.
 **/

const sdk = require('./sdk.js');

var options = {
    appId: 'a1476238',
    groupId: 'g2349178',
    deviceId: 'd2775428',
    username: 'bathi',
    password: '1234'
};

var mySdk = sdk(options);

if(mySdk != null){

    mySdk.begin(onConnect,onMessage);



}

function onConnect() {

    setTimeout(function () {
        mySdk.sendMessage('This is app 1 on connect message.');
    },5000);

}

function onMessage(message) {
    console.log('app 2 loop back: '+message);
    mySdk.sendMessage('This is app 1 on connect message');

}




