/**
 * Created by dar on 12/4/17.
 */

/**
 *
 * @param parameters ( this is used to pass information related to connectivity
 *  appId,groupId,deviceId,username,password
 *  )
 *
 */
const mqtt = require('mqtt');
var details=require('./details.json')

module.exports = function (parameters) {

    //required parameter validation
    var isParaValid = true;
    var requiredParameters = ['appId','groupId','deviceId','username','password'];
    requiredParameters.forEach(function (paraName) {
        if(typeof parameters[paraName] == 'undefined'){
            console.log("required parameter : '"+paraName+"' undefined");
            isParaValid = false;
        }
    });


    var client = null;

    if(isParaValid){

        return {
            /**
             * @param onConnect
             * @param onMessage(topic,message)
             */
            begin : function (onConnect,onMessage) {
                //connect with previous parameters
                console.log(parameters);


                var options = {
                    clientId: parameters['deviceId'],
                    username: parameters['username'],
                    password: parameters['password']
                };
                /*
                    client will handle
                         * Regular server pings
                         * QoS flow
                         * Automatic reconnections
                         * Start publishing before being connected
                 */
                client  = mqtt.connect(details.ip,options);
                client.on('connect', function () {
                    console.log('connected ... ');
                    onConnect();
                    client.subscribe(parameters['appId']+'/'+parameters['groupId']+'/'+parameters['deviceId']+'/SUB');
                });
                client.on('reconnect',function () {
                    console.log('sdk reconnecting ... ');
                });
                client.on('close',function () {
                    console.log('sdk disconnected ... ');
                });
                client.on('offline',function () {
                   console.log('skd offline ... ');
                });
                client.on('error',function (error) {
                   console.log('sdk can not connect : '+error);
                });
                client.on('message', function (topic,message) {
                    console.log('i am inside on message')
                    onMessage(message.toString());
                });

            },

            /**
             * @param msg ( string )
             */
            sendMessage : function (msg) {
                if(typeof msg == 'string'){
                    client.publish(parameters['appId']+'/'+parameters['groupId']+'/'+parameters['deviceId']+'/PUB',msg);
                }else {
                    console.log('message type is not string');
                }
            }
        }
    }else {
        return null;
    }


};

