const discord = require("discord.js");

module.exports.run = async (client, message, args) =>{

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Je hebt geen permissie om dit te doen!");

    await message.channel.overwritePermissions([

        {
            id: message.guild.roles.cache.find(r => r.name == "@everyone").id,
            allow: ['SEND_MESSAGES']
        }
 
    ]);

    message.channel.send("Lockdown modus is uitgeschakeld!");

}

module.exports.help = {
    name: "unlock"
}