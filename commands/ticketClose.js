const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "787692488340537344";

    if (!message.member.hasPermission("KICK_MEMBER")) return message.reply("Je hebt geen permissies!");

    if (message.channel.parentID == categoryID) {

        message.channel.delete();

        // Create embed.
        var embedCreateTicket = new discord.MessageEmbed()
            .setTitle("Closed " + message.channel.name)
            .setDescription("Dit ticket is gesloten! Maak een nieuwe aan met /ticket!")
            .setFooter("Ticket gesloten");

        // Channel voor logging
        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "log");
        if (!ticketChannel) return message.reply("Ticket bestaat niet!");

        ticketChannel.send(embedCreateTicket);

    } else {

        message.channel.send("Dit commando werkt alleen in een ticket!");

    }



}

module.exports.help = {
    name: "close"
}