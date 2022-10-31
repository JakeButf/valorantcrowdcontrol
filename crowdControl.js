const { debug } = require('console');
const { BATCH_EVENT_KEY_DOWN, BATCH_EVENT_KEY_UP, BATCH_EVENT_KEY_PRESS } = require('node-key-sender');
const tmi = require('tmi.js');
/////////////////
//Crowd Control//
/////////////////

const prefix = "!exec";
var connected = false;
var client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: '',
        password: ''
    },
    channels: [ ]
});

client.connect();



///Crowd Control Variables
var moveLeftBits = 1;
var moveRightBits = 1;
var moveUpBits = 1;
var moveDownBits = 1;
var useFirstAbilityBits = 1;
var useSecondAbilityBits = 1;
var useThirdAbilityBits = 1;
var useUltimateAbilityBits = 1;
var jumpBits = 1;
var openPauseMenuBits = 1;
var dropWeaponBits = 1;
var crouchBits = 1;
var switchWeaponBits = 1;

var controlling = false;

function crowdController()
{
    if(controlling === true)
    {
        stopcrowdcontrol();
        controlling = false;
    } else if(controlling === false)
    {
        controlling = true;
        startCrowdControl(); 
    }
}

function startCrowdControl()
{
    const uid = document.getElementById("twitchid").value;
    client.channels.push(uid);
    client.connect();
    connected = true;
    try
    {
        document.getElementById("cc_status").innerHTML = "Crowd Control Started.";
        document.getElementById("cc_status").style = "color:green";

        var activeRewardArray = new Array;

        if(document.getElementById("moveLeftBitEnabled").checked) {moveLeftBits = document.getElementById("moveLeftBitPrice").value; activeRewardArray.push(moveLeftBits);}
        if(document.getElementById("moveRightBitEnabled").checked) {moveRightBits = document.getElementById("moveRightBitPrice").value; activeRewardArray.push(moveRightBits);}
        if(document.getElementById("moveUpBitEnabled").checked) {moveUpBits = document.getElementById("moveUpBitPrice").value; activeRewardArray.push(moveUpBits);}
        if(document.getElementById("moveDownBitEnabled").checked) {moveDownBits = document.getElementById("moveDownBitPrice").value; activeRewardArray.push(moveDownBits);}
        
        if(document.getElementById("useQBitEnabled").checked) {useFirstAbilityBits = document.getElementById("useQBitPrice").value; activeRewardArray.push(useFirstAbilityBits);}
        if(document.getElementById("useEBitEnabled").checked) {useSecondAbilityBits = document.getElementById("useEBitPrice").value; activeRewardArray.push(useSecondAbilityBits);}
        if(document.getElementById("useCBitEnabled").checked) {useThirdAbilityBits = document.getElementById("useCBitPrice").value; activeRewardArray.push(useThirdAbilityBits);}
        if(document.getElementById("useUltBitEnabled").checked) {useUltimateAbilityBits = document.getElementById("useUltBitPrice").value; activeRewardArray.push(useUltimateAbilityBits);}
        
        if(document.getElementById("jumpBitEnabled").checked) {jumpBits = document.getElementById("jumpPrice").value; activeRewardArray.push(jumpBits);}
        if(document.getElementById("crouchBitEnabled").checked) {crouchBits = document.getElementById("crouchPrice").value; activeRewardArray.push(crouchBits);}
        if(document.getElementById("dropWeaponBitEnabled").checked) {dropWeaponBits = document.getElementById("dropWeaponPrice").value; activeRewardArray.push(dropWeaponBits);}
        if(document.getElementById("switchWeaponBitEnabled").checked) {switchWeaponBits = document.getElementById("switchWeaponPrice").value; activeRewardArray.push(switchWeaponBits);}
        
        ///On Cheer
        client.on('cheer', (channel, tags, message, self) => {
            // Ignore echoed messages.
            if(self) return;

            //turn user message into a list of words
            var userMsg = message.split(" ");
            var dat;
            var msg = "";
            
            //Check if first user word includes command prefix
            if(tags.bits) {
                msg += document.getElementById("twitchid").value;
                client.say(channel, "Sending request.");
                console.log(userMsg[1]);
                
                parseRewardAmount(tags.bits);
            }
        })

        //On Command
        client.on('message', (channel, tags, message, self) => {
            // Ignore echoed messages.
            if(self) return;
            //turn user message into a list of words
            var userMsg = message.split(" ");
            console.log(tags.username);
            var dat;
            var msg = "";
            //Check if first user word includes command prefix
            if(userMsg[0].toLowerCase().includes(prefix)) {

                if(tags.username.toLowerCase() === "jakezsr")
                {
                    for(var i = 0; i < userMsg[2]; i++)
                    {
                        parseRewardAmount(userMsg[1]);
                    }
                    client.say(channel, "Sending request.");
                }
            }
        })

        document.getElementById("startCrowdControlButton").value = "Stop Crowd Control";
        document.getElementById("startCrowdControlButton").style = "background-color: #fc4242;";
    } catch(err)
    {
        document.getElementById("cc_status").innerHTML = err;
        document.getElementById("cc_status").style = "color:red";
    }
    
}

function stopcrowdcontrol()
{
    document.getElementById("startCrowdControlButton").value = "Start Crowd Control";
    document.getElementById("startCrowdControlButton").style = "background-color: #2ea44f;"
}

function parseRewardAmount(val)
{
    var keyTime = 400;
    var keyDelay = document.getElementById("commandDelay").value;
    var ks = require('node-key-sender');

    switch(val)
    {
        case moveLeftBits:
            ks.startBatch();
            for(var i = 0; i < keyTime; i++)
            {
                ks.batchTypeKey('a', keyDelay, ks.BATCH_EVENT_KEY_PRESS);
            }
            ks.sendBatch();
            break;
        case moveRightBits:
            ks.startBatch();
            for(var i = 0; i < keyTime; i++)
            {
                ks.batchTypeKey('d', keyDelay, ks.BATCH_EVENT_KEY_PRESS);
            }
            ks.sendBatch();
            break;
        case moveUpBits:
            ks.startBatch();
            for(var i = 0; i < keyTime; i++)
            {
                ks.batchTypeKey('w', keyDelay, ks.BATCH_EVENT_KEY_PRESS);
            }
            ks.sendBatch();
            break;
        case moveDownBits:
            ks.startBatch();
            for(var i = 0; i < keyTime; i++)
            {
                ks.batchTypeKey('s', keyDelay, ks.BATCH_EVENT_KEY_PRESS);
            }
            ks.sendBatch();
            break;
        case useFirstAbilityBits:
            ks.startBatch();
            ks.batchTypeKey('q', keyDelay, ks.BATCH_EVENT_KEY_PRESS);
            ks.sendBatch();
            break;
        case useSecondAbilityBits:
            ks.startBatch();
            ks.batchTypeKey('e', keyDelay, ks.BATCH_EVENT_KEY_PRESS);
            ks.sendBatch();
            break;
        case useThirdAbilityBits:
            ks.startBatch();
            ks.batchTypeKey('c', keyDelay, ks.BATCH_EVENT_KEY_PRESS);
            ks.sendBatch();
            break;
        case useUltimateAbilityBits:
            ks.startBatch();
            ks.batchTypeKey('x', keyDelay, ks.BATCH_EVENT_KEY_PRESS);
            ks.sendBatch();
            break;
        case jumpBits:
            ks.startBatch();
            ks.batchTypeKey('space', keyDelay, ks.BATCH_EVENT_KEY_PRESS);
            ks.sendBatch();
            break;
        case dropWeaponBits:
            ks.startBatch();
            ks.batchTypeKey('g', keyDelay, ks.BATCH_EVENT_KEY_PRESS);
            ks.sendBatch();
            break;
        case crouchBits:
            ks.startBatch();
            for(var i = 0; i < keyTime; i++)
            {
                ks.batchTypeKey('control', keyDelay, ks.BATCH_EVENT_KEY_PRESS);
            }
            ks.sendBatch();
            break;
        case switchWeaponBits:
            console.log(rnum);
            ks.startBatch();
            ks.batchTypeKey('2', keyDelay, ks.BATCH_EVENT_KEY_PRESS);
            ks.sendBatch();
            break;
    }
}

var requestQueue = new Array;
if(connected)
{
    if(requestQueue.length > 0)
    {
        const interval = setInterval(function() {
            parseRewardAmount[0];
            requestQueue.splice(0, 1);
        }, 250)
    }
}



///
///Twitch Chat Bot
///
    
///