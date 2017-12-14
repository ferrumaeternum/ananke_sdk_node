/**
 * Created by dar on 12/4/17.
 */

const sdk = require('./sdk.js');

var options = {
    appId: 'a1476238',
    groupId: 'g2349178',
    deviceId: 'd4083171',
    username: 'bathi1',
    password: '1234'
};

var mySdk = sdk(options);
messageapp2='app 2 on connect message.';


if(mySdk != null){


    mySdk.begin(onConnect,onMessage);



}

function onConnect() {

    setInterval(function () {
        mySdk.sendMessage(messageapp2)
        console.log('msg ...')
    },3000);

}

function onMessage(message) {
    console.log('app 1 loop back: '+message);
    mySdk.sendMessage(messageapp2);

}




