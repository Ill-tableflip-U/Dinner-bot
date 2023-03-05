const d = require('./databases.json');
const { writeFileSync } = require('fs')
//REQUIRING IMPORTANT FILES
const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
//SETTING INTENTS OR PERMISSIONS IDK
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		
	],
});

const Discord = require('discord.js')

client.commands = new Collection();


function wordchecker(word){
    bannedwords = ["crap", "urmum", "stupid"]
    
    wordcase = word.toLowerCase()
    
    for (let i = 0; i < bannedwords.length; i++) {
        
        if (wordcase.includes(bannedwords[i])){
            
            return true
        }

    }
    return false
}




console.log("Startup ok")

client.on('messageCreate', async receivedMessage => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
		console.log("own")
        return
    }
	console.log(receivedMessage)
    if (receivedMessage.content.startsWith("!f")){
		console.log("det")

		let checkcontent = wordchecker(receivedMessage.content.substring(2,receivedMessage.content.length))
		if (checkcontent===true){
			receivedMessage.react('❌')
		}else{
			

			function checkfood(foods) {
				return foods=== receivedMessage.content.substring(2,receivedMessage.content.length);
			}
			const result = d.meals.filter(checkfood);
			if (result[0]){
				receivedMessage.react('💀');
			} else{
			let food = receivedMessage.content.substring(2,receivedMessage.content.length)
			
			d.meals.push(food)
			writeFileSync('databases.json', JSON.stringify(d))
			receivedMessage.react('✅');
			}
		}	
	//console.log('newfood is '+newfood)
}
	
})


//SETTING UP THE SETECTION FOR THE COMMAND ACTIVATION

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	
	if (interaction.commandName === 'generatedinner') {
		console.log(interaction.user.id)
		
		
		let random = Number( Math.floor(Math.random() * d.meals.length));
		console.log(random)
		console.log( d.meals[random])
		interaction.reply("Tonight you will be eating: "+ d.meals[random])
		
	}
});








//LOGGING IN
console.log("attempting login")
client.login(token) 
console.log("login")
