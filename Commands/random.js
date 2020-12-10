var name = "random";
help[name] = function(){
    var info = ["Random","Generates random number for 0 - value and value - value.","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    var args = msg.content.split(" ")
    if(args[2] == "list"){
        var numberList = [];
        if(args[4] >= 31){
            args[4] = 30;
            msg.reply("Can't do more then 30 sorry.");
        }
        for(var counter = args[4]; counter != 0; counter--){
            numberList.push(Math.floor(Math.random() * args[3]));
        }
        msg.reply(threeRowString(numberList));
    }
    else if(isNaN(args[2])){
        msg.reply("Are you dumb?");
    }
    else if(args[3] == null){
        msg.reply(Math.floor(Math.random() * args[2]));
    }
    else if(args[4] == null){
        var result = Math.floor(Math.random()*(args[3]-args[2]+1)+args[2]);
        if(result < args[2]){result = args[2];}
        else if(result > args[3]){result = args[3];}
        msg.reply(result);
    }
    else{
        msg.reply("You only can generate a number between two numbers.");
    }
}