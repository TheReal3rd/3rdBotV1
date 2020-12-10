// 3rd_bot.
// 3rd©
require('dotenv').config();
const fs = require('fs');
const {exec} = require('child_process')
const Discord = require('discord.js');
const http = require('http');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const OWNER_ID = process.env.OWNER_ID;
const PREFIX = process.env.PREFIX;
var commandNames;
var commands;
var help;

function commandExecution(command) {
  return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
      if (error) {
          reject(error)
          writeLogs("\u001b[31m ->CLI<- "+error,false);
      } else {
          resolve(stdout)
          writeLogs("\u001b[36m ->CLI<- "+stdout,false);
      }
      }).stdout.pipe(process.stdout)
  })
}

function twoRowString(list){
  var value = list.length / 2;
  var menuValues = (value+"").split(".");
  var stringArray = [];
  for(var counter = 0; counter != menuValues[0]; counter++){stringArray.push(list[counter]+" | "+list[counter+parseInt(menuValues[0])]);}
  if(menuValues[1] == 5){stringArray.push(list[list.length-1])}
  return stringArray;
}

function threeRowString(list){
  var value = list.length / 3;
  value = value.toFixed(1);
  var menuValues = (value+"").split(".");
  var stringArray = [];
  for(var counter = 0; counter != menuValues[0]; counter++){stringArray.push(list[counter]+" | "+list[counter+parseInt(menuValues[0])]+" | "+list[counter+parseInt(menuValues[0])+1]);}
  if(menuValues[1] == 7){stringArray.push(list[list.length-2]+" | "+list[list.length-1]);}
  else{stringArray.push(list[list.length-1]);}
  return stringArray;
}


function sendErrors(err){
  writeLogs(err);
  bot.fetchUser(OWNER_ID).then((user) => {
    user.send("loadCommands | "+bot.user.tag+" | ERROR!: "+err);
  });
}

//Needs to be removed
function filter(id){
  var target = id.replace("<@","");
  var target = target.replace(">","");
  var target = target.replace("!","");
  return target;
}

function loadCommands(){
  commands = {};
  help = {};
  commandNames = [];
  for(var command of fs.readdirSync("Commands/")){
    try{
      name = null;
      eval(fs.readFileSync("Commands/"+command, "utf-8"));
      if(name != null){
        commandNames.push(name.toLowerCase());
      }
      writeLogs("+Command loaded: "+command+" | "+name,false);
    }
    catch(err){
      sendErrors(err);
    }
  }
}

function checkPerms(id){
  try{
    for(var admins of fs.readdirSync("Permissions/")){
      var admin = admins.replace(".json","");
      if(admin == id){
        var data = fs.readFileSync("Permissions/"+admins);
        var readData = JSON.parse(data);
        var level = readData.Level;
      }
    }
  }
  catch(err){
    sendErrors(err);  
  }
  return level;
}

function writeLogs(data,logText){
  if(logText === true){
    fs.appendFile("DiscordLogs.txt",data, function(err) {
      if(err) {
          return console.log(err);
      }
    })
  }
  console.log(data);
  if (process.send) {
    process.send(data);
  }
}

bot.login(TOKEN);

//Cross Thread communication
process.on('message', message => {
  if(message == "shutdown"){
    process.exit(0);
  }
});

bot.on("ready", () => {
  writeLogs("Logged in as "+bot.user.tag+"!",false);
  loadCommands();
});

bot.on("message", msg => {
  writeLogs("% By: "+msg.author+" | Channel: "+msg.channel.name+" | Message: "+msg.content+" | Date: "+msg.createdAt,true);
  if(msg.author.bot){return}
  if (msg.content.toLowerCase().startsWith(PREFIX)) {
      var search = msg.content.replace(PREFIX+" ", "");
      var args1 = search.split(" ");
      {if(search == ""){return;}
      try{if(args1 != null){commands[args1[0].toLowerCase()](msg);}}
      catch{msg.reply("Try "+PREFIX+" help to see all available commands.");}
    }
  }
});
