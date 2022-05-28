const { Client, MessageEmbed } = require("discord.js")
const client = new Client()
const fs = require("fs")
// Reglas de la comunidad!
const rules = JSON.parse(fs.readFileSync("rules.json").toString())

client.on("ready", () => {
	// "Hola chicos!, estoy de vuelta!", "Hola!, como han estado?", "Hola chicos!, cuanto tiempo sin verlos!", "Hola!, ¿Cómo han estado?", "Hola chicos!, me alegra volver a verlos!"
	const messages = ["Hola pendejos!!"]
	const RandMessage = Math.floor((Math.random()*messages.length-1))
	const channels = client.channels.cache
	channels.forEach((ch) => {
		if(ch.name === "charla-general"){
			ch.send(messages[0])
		}
	})
})
client.on("emojiCreate", (emoji) => {
	const channels = client.channels.cache
	channels.forEach((ch) => {
		if(ch.name === "charla-general"){
			client.users.fetch(emoji.guild.ownerID).then(user => {
				ch.send(`@here <@${user.id}> añadio un nuevo emoji ${emoji}`)
			})
		}
	})
})
client.on("emojiUpdate", (OldEmoji, NewEmoji) => {
	const channels = client.channels.cache
	channels.forEach((ch) => {
		if(ch.name === "prueba-canal"){
			client.users.fetch(NewEmoji.guild.ownerID).then(user => {
				ch.send(`@here <@${user.id}> actualizo el emoji :${OldEmoji.name}: ${OldEmoji} a ${NewEmoji} :${NewEmoji.name}:`)
			})
		}
	})
})
client.on("guildMemberAdd", (member) => {
	const channels = client.channels.cache
	channels.forEach((channel) => {
		if(channel.name === "bienvenidos"){
			channel.send(`@everyone **${member.nickname}** se ha unido a nuestra comunidad!, demosle una calida bienvenida!`)
			channel.send(`Bienvenido <@${member.id}>!`)
		}
	})
})
client.on("guildMemberRemove", (member) => {
	const channels = client.channels.cache
	channels.forEach((channel) => {
		if(channel.name === "staff"){
			const name = client.guilds.cache.forEach((guild) => { return guild.name })
			channel.send(`@here <@${member.id}> fue eliminado de ${name}`)
		}
	})
})
client.on("message", (message) => {
	if(message.content === "!rules"){
		message.reply("Aqui tienes, todas las reglas de la comunidad!")
		const embed = new MessageEmbed()
		embed.setColor("ORANGE")
		embed.setTitle("* REGLAS DE LA COMUNIDAD *")
		embed.setAuthor("Customizacion-WoW Community", "https://avatars.githubusercontent.com/u/52859523?s=400&u=63cb61ef20c6e1894162ea367e91056a1cb74cbd&v=4")
		for(let i = 0; i < rules.length; i++){
			embed.addField(`Regla Nº ${i+1}`, rules[i])
		}
		message.channel.send(embed)
	}

	if(message.content.startsWith("!rule add")){
		const NewRule = message.content.substr(10, message.content.length)
		rules.push(`* ${NewRule}`)
		fs.writeFileSync("rules.json", JSON.stringify(rules))
	}

	if(message.content.startsWith("!rule del")){
		const RuleID = message.content.substr(10, message.content.length)
		rules.splice((RuleID-1), 1)
		fs.writeFileSync("rules.json", JSON.stringify(rules))
		message.reply(`Has eliminado la regla Nº ${(RuleID)}`)
	}

	if(message.content === "!commands"){
		const role = message.guild.roles.cache.map(role => {
			if(role.name === "Administrador"){
				return role.id
			}
			return null
		})
		console.log(message.author)
	}
})

client.login("ODU3MDUyODUzNzUxNjQ0MTcw.YNJ-qw.3u-HXAIZP8-h4J8On2tZs7qfcj8")