const discord = require("discord.js");

module.exports.run = async (client, message, args) =>{

   // !clear aantal
   if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Je hebt geen toestemming!");
 
   if (!args[0]) return message.reply("Geef een aantal berichten op dat je wilt verwijderen!");

   if (Number.isInteger(parseInt(args[0]))) {

       var aantal = parseInt(args[0]) + 1;

       message.channel.bulkDelete(aantal).then(() => { 

           if (args[0] == 0) {

               message.reply(`Geef een aantal op groter dan 0`).then(msg => msg.delete({timeout: 3000}));
           
           } else if (args[0] == 1) {
           
               message.reply(`Ik heb 1 bericht verwijderd!`).then(msg => msg.delete({timeout: 3000}));
           
           } else {
           
               message.reply(`Ik heb ${args[0]} berichten verwijderd!`).then(msg => msg.delete({timeout: 3000}));
           
           }

       });

   } else {
       return message.reply("Geef een aantal berichten op dat je wilt verwijderen!");
   } 

}

module.exports.help = {
    name: "clear"
}