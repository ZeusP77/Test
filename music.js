
const Discord = require('discord.js');

const Util = require('discord.js');

const getYoutubeID = require('get-youtube-id');

const fetchVideoInfo = require('youtube-info');

const YouTube = require('simple-youtube-api');

const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");

const queue = new Map();

const ytdl = require('ytdl-core');

const fs = require('fs');

const client = new Discord.Client({disableEveryone: true});

const prefix = "<>";
/////////////////////////
////////////////////////




const TOKEN = "NTQ5NjAwNDcxNTg5ODQ3MDQw.D1bgRw.M4fJFLTOmqemAtiPvveHiWk1rpI";



client.on('message', async msg =>{
	if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
    
    let args = msg.content.split(' ');

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

    if(command === `ping`) {
    let embed = new Discord.RichEmbed()
    .setColor(3447003)
    .setTitle("Pong!!")
    .setDescription(`${client.ping} ms,`)
    .setFooter(`Requested by | ${msg.author.tag}`);
    msg.delete().catch(O_o=>{})
    msg.channel.send(embed);
    }
});
/////////////////////////
////////////////////////
//////////////////////

/////////////////////////
////////////////////////
//////////////////////
/////////////////////////
////////////////////////
//////////////////////

/////////////////////////
////////////////////////
//////////////////////
/////////////////////////
////////////////////////
//////////////////////
client.on('message', async msg => { 
	if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
    
    const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
    
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;
        
        if (!voiceChannel) return msg.channel.send("**You Are Not In Any Voice Channel ! Please Join One And Retry**");
        
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        
        if (!permissions.has('CONNECT')) {

			return msg.channel.send("**I'm Missing Permission To Connect To This Voice Channel**");
        }
        
		if (!permissions.has('SPEAK')) {

			return msg.channel.send("**I'm Missing Permission To Speak To This Voice Channel**");
		}

		if (!permissions.has('EMBED_LINKS')) {

			return msg.channel.sendMessage("**i Don't Have Permission To Insert URls Please Give Me** \`Embed_Links\` **Permission And Retry**")
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

			const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            

			for (const video of Object.values(videos)) {
                
                const video2 = await youtube.getVideoByID(video.id); 
                await handleVideo(video2, msg, voiceChannel, true); 
            }
			return msg.channel.send(`**${playlist.title}**, Just added to the queue!`);
		} else {

			try {

                var video = await youtube.getVideo(url);
                
			} catch (error) {
				try {

					var videos = await youtube.searchVideos(searchString, 5);
					let index = 0;
                    const embed1 = new Discord.RichEmbed()
                    .setTitle(":mag_right:  YouTube Search Results :")
                    .setDescription(`
                    ${videos.map(video2 => `${++index}. **${video2.title}**`).join('\n')}`)
                    
					.setColor("#f7abab")
					msg.channel.sendEmbed(embed1).then(message =>{message.delete(20000)})
										
					try {

						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 15000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No one respone a number!!');
                    }
                    
					const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    
				} catch (err) {

					console.error(err);
					return msg.channel.send("I didn't find any results!");
				}
			}

            return handleVideo(video, msg, voiceChannel);
            
        }
        
	} else if (command === `skip`) {

		if (!msg.member.voiceChannel) return msg.channel.send("**You Must Join A Voice Channel In Order To Use \`-stop\` Commands**");
        if (!serverQueue) return msg.channel.send("**There Is No Queue To Skip!**");

		serverQueue.connection.dispatcher.end(':loudspeaker: **Skipped** \`[\` **${song.title}** \`]\`');
        return undefined;
        
	} else if (command === `stop`) {

		if (!msg.member.voiceChannel) return msg.channel.send("**You Must Join A Voice Channel In Order To Use \`-stop\` Commands**");
        if (!serverQueue) return msg.channel.send("There Is No Queue To Stop !");
        
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Ok, stopped & disconnected from your Voice channel');
        return undefined;
        
	} else if (command === `vol`) {

		if (!msg.member.voiceChannel) return msg.channel.send("**You Must Join A Voice Channel In Order To Use Music Commands**");
		if (!serverQueue) return msg.channel.send('In Order To Use Those Commands You Must Use Them While Playing Some Music ');
        if (!args[1]) return msg.channel.send(`**The Bot Volume Is :** \`${serverQueue.volume}\``);
        
		serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
        
        return msg.channel.send(`Volume Now is **${args[1]}**`);

	} else if (command === `np`) {

		if (!serverQueue) return msg.channel.send('There Is No Queue To Pause ! Please Fill It With Some Types Of Musics And Try Again');
		const embedNP = new Discord.RichEmbed()
	    .setDescription(`Now playing **${serverQueue.songs[0].title}**`)
        return msg.channel.sendEmbed(embedNP);
        
	} else if (command === `queue`) {
		
		if (!serverQueue) return msg.channel.send('There Is No Queue To Pause ! Please Fill It With Some Types Of Musics And Try Again');
		let index = 0;

		const embedqu = new Discord.RichEmbed()
        .setTitle("The Queue Songs :")
        .setDescription(`
        ${serverQueue.songs.map(song => `${++index}. **${song.title}**`).join('\n')}
		**Now playing :** **${serverQueue.songs[0].title}**`)
        .setColor("#f7abab")
		return msg.channel.sendEmbed(embedqu);
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send(`:loudspeaker: **Paused**`);
		}
		return msg.channel.send('There Is No Queue To Pause ! Please Fill It With Some Types Of Musics And Try Again');
	} else if (command === "resume") {

		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
            return msg.channel.send(':loudspeaker: **Stream Resuming..** :arrow_forward:');
            
		}
		return msg.channel.send('\`The Queue Is Empty\` **Please Fill It With Some Types Of Musics First And Than Use This Command**');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	

	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I Could Not Join This Voice Channel: ${error}!`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I Can't Join This Voice Channel Please Give Me Permissions Before Using My Commands: ${error}!`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`Adding To The Queue \`${song.title}\``);
	} 
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === ':loudspeaker: **Stream Ended** :milky_way:') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`**Playing** :notes: \`${song.title}\``);
}


client.on('message', async message => {
  

  if (message.author.bot) return undefined;
    if (!message.content.startsWith(prefix)) return undefined;
    
    let args = message.content.split(' ');

	let command = message.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)
  

  
  
       if (command === 'help-music') {
        let helpEmbed = new Discord.RichEmbed()
        .setTitle('**Music Commands**')
        .setDescription('**- Bot Prefix**')
                
        .addField('play', 'To Play A Song That You Like')
        .addField('join', 'Invite Me To A Voice Channel')
        .addField('leave', 'Kick Me From A voice Room')
        .addField('skip', 'Skip A Song')
        .addField('pause', 'Stop Playing A Music Temporally')
        .addField('resume', 'Resume Playing This Music')
        .addField('queue', 'See The List Of Musics That I Will Play')
        .addField('np', 'Shows You The Song That Im Playing Right Now')
        .setFooter('Ty to Ban and Aswa!')
      message.channel.send(helpEmbed);
    } 



})
client.login(TOKEN);