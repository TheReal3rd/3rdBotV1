const fork = require('child_process').fork;
var path = require('path');
const discordPath = path.resolve('discordBot.js');
const restarterPath = path.resolve('restarter.js');
const parameters = [];
const options = {stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]};
const filter = ["%","+","-"];

const discordChild = fork(discordPath,parameters,options);


discordChild.on('message', message => {
    if(message == "restart"){
        console.log("Rebooting...");
        const restartChild = fork(restarterPath,parameters,options);
    }
    for(i = filter.length;i != 0; i--){
        if(message.toString().includes(filter[i])) console.log('\u001b[32mDiscord:',message," <-");
    }
});

