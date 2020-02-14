const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const fs =require("fs");
const ms =require("ms");
const superagent = require("superagent");
const settings = require("./your settings.json");
var bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let xp =require("./xp.json");


var jokes = [
    "What time did the man go to the dentist? Tooth hurt-y",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "Want to hear a joke about a piece of paper? Never mind... it's tearable.",
    "I just watched a documentary about beavers. It was the best dam show I ever saw!",
    "If you see a robbery at an Apple Store does that make you an iWitness?",
    "Spring is here! I got so excited I wet my plants!",
    "A ham sandwich walks into a bar and orders a beer. The bartender says, \"Sorry we don’t serve food here.\"",
    "What’s Forrest Gump’s password? 1forrest1",
    "I bought some shoes from a drug dealer. I don't know what he laced them with, but I was tripping all day!",
    "Why do chicken coops only have two doors? Because if they had four, they would be chicken sedans!",
    "What do you call a factory that sells passable products? A satisfactory.",
    "A termite walks into a bar and asks, \"Is the bar tender here?\"",
    "When a dad drives past a graveyard: Did you know that's a popular cemetery? Yep, people are just dying to get in there!",
    "Two peanuts were walking down the street. One was a salted.",
    "Why did the invisible man turn down the job offer? He couldn't see himself doing it.",
    "I used to have a job at a calendar factory but I got the sack because I took a couple of days off.",
    "How do you make holy water? You boil the hell out of it.",
    "A three-legged dog walks into a bar and says to the bartender, \"I’m looking for the man who shot my paw.\"",
    "When you ask a dad if he's alright: \"No, I’m half left.\"",
    "I had a dream that I was a muffler last night. I woke up exhausted!",
    "How do you tell the difference between a frog and a horny toad? A frog says, \"Ribbit, ribbit\" and a horny toad says, \"Rub it, rub it.\"",
    "Did you hear the news? FedEx and UPS are merging. They’re going to go by the name Fed-Up from now on.",
    "5/4 of people admit that they’re bad with fractions.",
    "MOM: \"How do I look?\" DAD: \"With your eyes.\"",
    "What is Beethoven’s favorite fruit? A ba-na-na-na.",
    "What did the horse say after it tripped? \"Help! I’ve fallen and I can’t giddyup!\”",
    "Did you hear about the circus fire? It was in tents!",
    "Don't trust atoms. They make up everything!",
    "What do you get when you cross an elephant with a rhino? Elephino.",
    "How many tickles does it take to make an octopus laugh? Ten-tickles.",
    "What's the best part about living in Switzerland? I don't know, but the flag is a big plus.",
    "What do prisoners use to call each other? Cell phones.",
    "Why couldn't the bike standup by itself? It was two tired.",
    "What do you call a dog that can do magic? A Labracadabrador.",
    "Why didn't the vampire attack Taylor Swift? She had bad blood.",
    "NURSE: \"Blood type?\" DAD: \"Red.\"",
    "SERVER: \"Sorry about your wait.\" DAD: \"Are you saying I’m fat?\”",
    "What do you call a fish with two knees? A “two-knee” fish.",
    "I was interrogated over the theft of a cheese toastie. Man, they really grilled me.",
    "What do you get when you cross a snowman with a vampire? Frostbite.",
    "Can February March? No, but April May!",
    "When you ask a dad if they got a haircut: \"No, I got them all cut!\"",
    "What does a zombie vegetarian eat? “GRRRAAAAAIIIINNNNS!”",
    "What does an angry pepper do? It gets jalapeño your face.",
    "Why wasn't the woman happy with the velcro she bought? It was a total ripoff.",
    "What did the buffalo say to his son when he dropped him off at school? Bison.",
    "What do you call someone with no body and no nose? Nobody knows.",
    "Where did the college-aged vampire like to shop? Forever 21.",
    "You heard of that new band 1023MB? They're good but they haven't got a gig yet.",
    "Why did the crab never share? Because he's shellfish."
];

const client = new Discord.Client({
    autoReconnect: true, 
    max_message_cache: 0
});

const serverStats = {
    guildID:'317320307138363392',
    totalUserID:'639367577671565312',
    memberCountID:'639368311548936213',
    botCountID:'639368404213432331'
}



const TOKEN = "NTQ5NjAwNDcxNTg5ODQ3MDQw.D1bgRw.M4fJFLTOmqemAtiPvveHiWk1rpI";
const PREFIX = "<>";


var fortunes = [
    "Yes",
    "No",
    "Maybe",
]

var servers = {};

const activities_list = [
    "Hello World!", 
    "with <>help :v:",
    "because of Aswa#9856 !", 
    "In Updates!"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

bot.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        bot.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 5000); // Runs this every 5 seconds.
});




bot.on("guildMemberAdd", async member => {
    member.guild.channels.find("name", "ᴡᴇʟᴄᴏᴍᴇ").sendMessage("Watch out everyone!"+member.toString()+ " has joined the pary! The force be with you 🎷");
    member.addRole(member.guild.roles.find("name", "〘Λω〙"));
    if(member.guild.id !== serverStats.guildID) return;
    bot.channels.get(serverStats.totalUserID).setName(`Total Users : ${member.guild.memberCount}`);
    bot.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    bot.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);

});

bot.on("guildMemberRemove", async member =>{
    member.guild.channels.find("name", "ʟᴇᴀᴠᴇ").sendMessage(member.toString()+ " just left the party! 🎷");
    if(member.guild.id !== serverStats.guildID) return;
    bot.channels.get(serverStats.totalUserID).setName(`Total Users : ${member.guild.memberCount}`);
    bot.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    bot.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);
});


bot.on("message", async message => {
    if(!xp[message.author.id]){
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }
    let xpAdd = Math.floor(Math.random() *7)+8;

    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nextLevel = xp[message.author.id].level * 400;
    xp[message.author.id].xp = curxp + xpAdd;

    if( nextLevel <= xp[message.author.id].xp){
        xp[message.author.id].level = curlvl + 1;
        let lvlup =new Discord.RichEmbed()
        .setTitle("Level Up!⬆️🔝⬆️")
        .addField("New Level", curlvl + 1);

        message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
        if(err) console.log(err)
    });
    let difference =nextLevel -curxp;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let gg = messageArray.slice(1);


    if(message.author.equals(bot.user)) return;

    if(!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    

    switch (args[0].toLowerCase()) {
        case "info":
            message.channel.sendMessage("I'm a super bot created by [AW]Aswa#9856 !");
            break;
        case "8ball":
            if (args[1])  message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
             else  message.channel.sendMessage("I can't read that...");
            break;
        case "dadjokes":
             message.channel.sendMessage(jokes[Math.floor(Math.random() * jokes.length)]);
            break;
        case "help":
            var embed = new Discord.RichEmbed()
                .setTitle("~General help~")
                .addField("<>help", "~General Help~")
                .addField("<>help-moderation", "~Commands for Moderation~")
                .addField("<>help-music", "~Note:Them works only when i am hosted on Aswa's PC!~")
                .addField("<>help-roles", "~Commands for Roles~")
                .addField("<>help-fun", "~Commands for Games and Fun~")
                .addField("<>info", "~Informations about me~")
                .addField("<>serverinfo", "~I offer you informations about the server.~")
                .addField("<>botinfo", "~I offer you informations about me.~")
                .addField("<>avatar / <>avatar @user", "~Let me show you your avatar or a person avatar!~")
                .addField("<>level", "~Check your Level in the Clan~")
                .addField("More in the future update! :)", ":v:")
                .setFooter("Bot created by [AW]Aswa#9856")
            message.channel.sendEmbed(embed);
            break;
        case "help-moderation":
            var ModerationE = new Discord.RichEmbed()
                .setTitle("~Moderation Commands~")
                .addField("<>kick @user", "Moderators and higher roles can kick members if they did something wrong.")
                .addField("<>ban @user", "Ban an user who broke the rules!")
                .addField("<>report @user Reason", "Offers informations to Staff Members about players who are breaking rules.")
                .addField("<>mute @user", "Mute an user for a reason.")
                .addField("<>tmute @user time", "Mute an user for a reason.")
                .addField("<>unmute @user", "Unmute an user who's punish has gone.")
                .addField("<>clear (number of messages +1)", "Clear a certain number of messages.")
                .setFooter("Bot created by [AW]Aswa#9856")
            message.channel.sendEmbed(ModerationE);
            break;
        case "help-fun":
            var FunE = new Discord.RichEmbed()
                .setTitle("~Fun Commands~")
                .addField("<>info", "Offers u informations about me.")
                .addField("<>8ball", "Ask me if you will be rich,if u will be paid well,if u will be lucky and so on...")
                .addField("<>dog", "I will send u a friendly picture with one of the best friends of a human!")
                .addField("<>spank @user", "Give me the permission to slap an user for you. :D")
                .addField("-dadjokes", "Just some jokes :D")
                .setFooter("Bot created by [AW]Aswa#9856")
            message.channel.sendEmbed(FunE);
            break;
        case "secret":
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You are not a leader or an administrator! :v:");
            var Sec = new Discord.RichEmbed()
                .setTitle("~Secret Commands~")
                .addField("<>rgb @rang", "Make a rang to change colors every 1 second.")
                .addField("<>stoprgb", "Stop all rgb roles in the server.")
                .addField("<>say", "Say something using the bot.")
                .setFooter("Bot created by [AW]Aswa#9856")
            message.channel.sendEmbed(Sec);
            break;
        case "help-roles":
            var RolesE =new Discord.RichEmbed()
                .setTitle("~Roles Commands~")
                .addField("<>dj @(your name)","I will instantely offer you this role.")
                .addField("<>starve.io @(your name)","I will instantely offer you this role.")
                .addField("<>dynast.io @(your name)","I will instantely offer you this role.")
                .addField("<>surviv.io @(your name)","I will instantely offer you this role.")
                .addField("<>roblox @(your name)","I will instantely offer you this role.")
                .addField("<>fortnite @(your name)","I will instantely offer you this role.")
                .addField("<>apex @(your name)","I will instantely offer you this role.")
                .addField("<>csgo @(your name)","I will instantely offer you this role.")
                .addField("<>verify @(your name)","Verify yourself in the server.")
                .addField("<>announcements @(your name)","Gain access to announcements channel.")
                .setFooter("Bot created by [AW]Aswa#9856")
            message.channel.sendEmbed(RolesE);
            break;
        case "kick":
            let kUser = message.guild.member(message.mentions.users.first()|| message.guild.members.get(args[0]));
            if(!kUser) return message.channel.send("Can't find the user!");
            if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("You can't kick an Administrator!")
            let kReason = args.join(" ").slice(22);
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You can't do that!");
            if(message.member = kUser) return message.channel.send("You can't kick yourself!");

            let kickedEmbed = new Discord.RichEmbed()
            .setDescription("~Kick~")
            .setColor("#e56b00")
            .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
            .addField ("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
            .addField("Channel", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", kReason);

            let kickChannel =message.guild.channels.find("name", "ꜱᴇʀᴠᴇʀ-ʟᴏɢ");

            message.delete().catch(O_o=>{});
            message.channel.send(`${kUser} was kicked from server by <@${message.author.id}>!`)
            message.guild.member(kUser).kick(kReason);
            kickChannel.send(kickedEmbed);
            break;
        case "ban":
            let bUser = message.guild.member(message.mentions.users.first()|| message.guild.members.get(args[0]));
            if(!bUser) return message.channel.send("Can't find the user!");
            let bReason = args.join(" ").slice(22);
            if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("You can't ban an Administrator!");
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You can't do that!");
            if(message.member = bUser) return message.channel.send("You can't ban yourself!");

            let BannedEmbed = new Discord.RichEmbed()
            .setDescription("~Ban~")
            .setColor("#e56b00")
            .addField("Banned User", `${bUser} with ID ${bUser.id}`)
            .addField ("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
            .addField("Channel", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", bReason);

            let banChannel =message.guild.channels.find("name", "ꜱᴇʀᴠᴇʀ-ʟᴏɢ");
        
            message.delete().catch(O_o=>{});
            message.channel.send(`${bUser} was banned from server by <@${message.author.id}>!`)
            message.guild.member(bUser).ban(bReason);
            banChannel.send(BannedEmbed);
            break;
        case "report":
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!rUser) return message.channel.send("Couldn't find user.");
            let reason = args.join(" ").slice(22);
    
            let reportEmbed =new Discord.RichEmbed()
            .setDescription("Reports")
            .setColor("#14f153")
            .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
            .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
            .addField("Channel", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", reason);
    
            let reportschannel = message.guild.channels.find("name", "ꜱᴇʀᴠᴇʀ-ʟᴏɢ");
            message.delete().catch(O_o=>{});
            reportschannel.send(reportEmbed);
            break;
        case "dog":
            let {body} = await superagent
            .get(`https://random.dog/woof.json`);

            let dogembed = new Discord.RichEmbed()
            .setColor("#ff9900")
            .setTitle("Doggo :dog:")
            .setImage(body.url);
            message.channel.send(dogembed);
            break;
        case "mute":
            let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!tomute) return message.reply("You didn't specify a valid name.");
            if(message.member==tomute) return message.channel("You can't mute yourself!");
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel("You don't have enough permissions to use this command.");
            if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute him/her.");
            let muterole =message.guild.roles.find(`name`, "Mᴜᴛᴇ Rᴏʟᴇ");
            if(!muterole){
                try{
                    muterole = await message.guild.createRole({
                        name: "Mᴜᴛᴇ Rᴏʟᴇ",
                        color: "#000000",
                        permissions:[]
                    })
                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                    });
                }catch(e){
                    console.log(e.stack);
                }
            }
            await(tomute.addRole(muterole.id));
            message.reply(`<@${tomute.id}> has been muted!`);

            
            break;
        case "unmute":
            let unmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!unmute) return message.reply("Couldn't find user.");
            if(unmute.hasPermission("ADMINISTRATOR")) return message.reply("Can't mute him.");
            let muterrole =message.guild.roles.find(`name`, "Mᴜᴛᴇ Rᴏʟᴇ");
            let abd =message.guild.roles.find(`name`, "<>");
            unmute.removeRole(muterrole.id);
            unmute.addRole(abd.id)
            message.channel.send(`<@${unmute.id}> has been unmuted!`);
            break;
        case "spank":
            let spankembed = new Discord.RichEmbed()
            .setColor("#ff9900")
            .setTitle("Slap! :v:")
            .setImage("https://media.discordapp.net/attachments/542840874653057024/550291468783321099/spank.png");
            message.channel.send(spankembed);
            break;
        case "dj":
            let U1 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let R1 = message.guild.roles.find("name", "DJ");
            U1.addRole(R1.id);
            message.delete().catch(O_o=>{});
            message.channel.send(`✯Congrats,<@${U1.id}>!You just became a DJ!✯`);
            break;
        case "roblox":
            let U2 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let R2 = message.guild.roles.find("name", "ROBLOX");
            U2.addRole(R2.id);
            message.delete().catch(O_o=>{});
            message.channel.send(`✯Congrats,<@${U2.id}>!You just became a ROBLOX player of this clan!✯`);
            break;
        case "starve.io":
            let U3 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let R3 = message.guild.roles.find("name", "Starve.io");
            U3.addRole(R3.id);
            message.delete().catch(O_o=>{});
            message.channel.send(`✯Congrats,<@${U3.id}>!You just became a Starve.io player of this clan!✯`);
            break;
        case "dynast.io":
            let U4 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let R4 = message.guild.roles.find("name", "Dynast.io");
            U4.addRole(R4.id);
            message.delete().catch(O_o=>{});
            message.channel.send(`✯Congrats,<@${U4.id}>!You just became a Dynast.io player of this clan!✯`);
            break;
        case "surviv.io":
            let U5 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let R5 = message.guild.roles.find("name", "Surviv.io");
            U5.addRole(R5.id);
            message.delete().catch(O_o=>{});
            message.channel.send(`✯Congrats,<@${U5.id}>!You just became a Surviv.io player of this clan!✯`);
            break;
        case "fortnite":
            let U6 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let R6 = message.guild.roles.find("name", "Fortnite");
            U6.addRole(R6.id);
            message.delete().catch(O_o=>{});
            message.channel.send(`✯Congrats,<@${U6.id}>!You just became a Fortnite player of this clan!✯`);
            break;
        case "apex":
            let U7 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let R7 = message.guild.roles.find("name", "Apex Legends");
            U7.addRole(R7.id);
            message.delete().catch(O_o=>{});
            message.channel.send(`✯Congrats,<@${U7.id}>!You just became an Apex Legends player of this clan!✯`);
            break;
        case "csgo":
            let U8 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let R8 = message.guild.roles.find("name", "CSGO");
            U8.addRole(R8.id);
            message.delete().catch(O_o=>{});
            message.channel.send(`✯Congrats,<@${U8.id}>!You just became a CSGO player of this clan!✯`);
            break;
        case "verify":
            let U9 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let R9 = message.guild.roles.find("name", "<>");
            U9.addRole(R9.id);
            message.delete().catch(O_o=>{});
            message.channel.send(`✯Congrats,<@${U9.id}>!You just unlocked the server channels!✯`);
            break;
        case "announcements":
            let U10 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let R10 = message.guild.roles.find("name", "Announcements");
            U10.addRole(R10.id);
            message.delete().catch(O_o=>{});
            message.channel.send(`✯Congrats,<@${U10.id}>!You just unlocked the announcements channel!✯`);
            break;
        case "clear":
            if(!message.member.hasPermissions("ADMINISTRATOR")) return message.reply("Oof,you don't have enough permissions to use this command! :v:");
            if(!args[1]) return message.channel.send("Oof,something went wrong ! :v:");
            message.delete().catch(O_o=>{});
            if (args[1]<=100)
            message.channel.bulkDelete(args[1]).then(() => {
                message.channel.send(`Cleared ${args[1]} messages.`).then(msg => msg.delete(5000));
            });
                else return message.channel.send("Please provide a number between 2 and 100!");
            break;
        case "level":
            let lvlEmbed= new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .addField("Level", curlvl, true)
            .addField("XP", curxp, true)
            .setFooter(`${difference} XP until level up! :v:`, message.author.displayAvatarURL);

            message.channel.send(lvlEmbed).then(msg =>{msg.delete(5000)});
            break;
        case "rgb":
            const rolez = message.mentions.roles.first() || message.guild.roles.find(r=> r.name === gg [0])
            if(!rolez) return message.channel.send(settings.messageresponse.rolenotfound).catch(err=> message.channel.send("No response"))
            if(!message.guild.member(bot.user.id).hasPermission("ADMINISTRATOR")) return message.channel.send(settings.messageresponse.missingperm).catch(err=> message.channel.send("No response"))
            message.delete().catch(O_o=>{});
            var colors = settings.rainbowrole
            var rolestart = setInterval(function() {
                var colorsz = colors[Math.floor(Math.random() * colors.length)];
                rolez.setColor(colorsz)
            }, settings.rainbowdelay); 
                message.channel.send(settings.messageresponse.success).catch(err=> message.channel.send("No response"))
             break;
            case "stoprgb":
                setTimeout(function () {
                    process.exit()
                    }, 1000);
                
                                message.channel.send(settings.messageresponse.rainbowstop).catch(err=> message.channel.send("No response"))
                break;
            case "say":
                if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Nope,you can't use this command. :v:");
                let botmessage = args.join(" ");
                message.delete().catch();
                message.channel.send(botmessage.replace('say',''));    
                break;
            case "avatar":
                let msg1 = await message.channel.send("Generating avatar...");
                let target = message.mentions.users.first() || message.author;
                await message.channel.send({files:[
                    {
                        attachment: target.displayAvatarURL,
                        name: "avatar.png"
                    }
                ]});
                msg1.delete();
                break;
            case "botinfo":
                let bicon = bot.user.displayAvatarURL;
                let botembed = new Discord.RichEmbed()
                .setDescription("Bot Information")
                .setColor("#15f153")
                .setThumbnail(bicon)
                .addField("Bot Name", bot.user.username)
                .addField("Created On", bot.user.createdAt);
            
            message.channel.send(botembed);
            break;
        case "serverinfo":
            let sicon = message.guild.iconURL;
            let serverembed = new Discord.RichEmbed()
            .setDescription("__**Server Information**__")
            .setColor("#15f153")
            .setThumbnail(sicon)
            .addField("Owner", message.guild.owner)
            .addField("Server Name", message.guild.name)
            .addField("Created On", message.guild.createdAt)
            .addField("You Joined", message.member.joinedAt)
            .addField("Total Members", message.guild.memberCount);

            message.channel.send(serverembed);
            break;
        case "tmute":
            let tomute1 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!tomute1) return message.reply("You didn't specify a valid username.");
            if(tomute1.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute him/her!");
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have enough permissions to use this command!");
            if(message.member==tomute1) return message.channel.send("You can't mute yourself.");
            let muterole1 = message.guild.roles.find(`name`, "Mᴜᴛᴇ Rᴏʟᴇ");
            //start of create role
            if(!muterole1){
                try{
                muterole1 = await message.guild.createRole({
                    name: "Mᴜᴛᴇ Rᴏʟᴇ",
                    color: "#000000",
                    permissions:[]
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole1, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                    });
                });
                }catch(e){
                console.log(e.stack);
                }
            }
            //end of create role
            let mutetime1 = args[2];
            if(!mutetime1) return message.reply("You didn't specify a time!");
            await(tomute1.addRole(muterole1.id));
            message.reply(`<@${tomute1.id}> has been muted for ${ms(ms(mutetime1))}`);

            setTimeout(function(){
                tomute1.removeRole(muterole1.id);
                message.channel.send(`<@${tomute1.id}> has been unmuted!`);
            }, ms(mutetime1));


            //end of module
            break;
        case "warn":
            var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('Insufficient Permissions!')
            .setDescription('You need the `MANAGE_MESSAGES` permission to use this command!')
            .setTimestamp();
            var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('Missing Arguments!')
            .setDescription('Usage: `warn [@User] [Reason]')
            .setTimestamp();
            
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
            let mentioned = message.guild.member(message.mentions.users.first()|| message.guild.members.get(args[0])); // Gets the user mentioned!
            if(!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
            if(message.member==mentioned) return message.channel.send("You can't warn yourself.")
            if(mentioned.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't warn someone with permissions \"Manage Messages\" permissions.");
            let reason12 = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
            if(!reason12) return message.channe.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning
            

            var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been warned in ${message.guild.name}`)
            .addField('Warned by', message.author.tag)
            .addField('Reason', reason12)
            .setTimestamp();
            mentioned.send(warningEmbed); // DMs the user the above embed!
            var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setTitle('User Successfully Warned!');
            message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed
            message.delete(); // Deletes the command
            break;
        case "play":
            break;
        case "skip":
            break;
        case "vol":
            break;
        case "stop":
            break;
        case "np":
            break;
        case "queue":
            break;
        case "resume":
            break;
        case "help-music":
            break;
        default:
            message.channel.sendMessage("Invalid command!");
    }
});

bot.login(TOKEN);