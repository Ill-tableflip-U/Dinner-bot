const d = require('./databases.json');

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
		let food = receivedMessage.content.substring(2,receivedMessage.content.length)
		foodj = JSON.stringify(food)
		d.meals.push(food)
		
		console.log("push "+d.meals)
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
