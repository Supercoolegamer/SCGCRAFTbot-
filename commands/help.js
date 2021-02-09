const discord = require("discord.js");

module.exports.run = async (client, message, args) =>{

    return message.channel.send("Heb je hulp nodig? Typ /ticket om een ticket aan te maken!");

}

module.exports.help = {
    name: "help"
}