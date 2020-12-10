var name = "test";
help[name] = function(){
    var info = ["Example","Used as an example.","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    msg.reply("used to test functions");
}