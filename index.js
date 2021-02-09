const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");
 
const client = new discord.Client();
client.commands = new discord.Collection();

client.login(process.env.token);

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);
    });

});


client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get('808380070418579488');

    if (!role) return;

    member.roles.add(role);


    con.query(`SELECT IDRole FROM rollen WHERE IDUser = '${member.user.id}'`, (err, rows) => {

        if (err) throw err;

        if (rows.length > 0) {

            for (let index = 0; index < rows.length; index++) {
                const role = rows[index];

                member.roles.add(role.IDRole);
            }

        }

    });


    var channel = member.guild.channels.cache.get('808379934640832593');

    if (!channel) return;

    channel.send(`Welkom bij de server ${member}`);

    var joinEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setDescription(`Hoi ${member.user.username}, **Welkom op de server**`)
        .setColor("#00FF00")
        .setFooter("Gebruiker gejoined")
        .setTimestamp();

    channel.send(joinEmbed);

});


client.on("guildMemberRemove", member => {

    var channel = member.guild.channels.cache.get('708335622443630624');

    if (!channel) return;

    var leaveEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setColor("#FF0000")
        .setFooter("Gebruiker geleaved")
        .setTimestamp();

    channel.send(leaveEmbed);

});
 
client.on("ready", async () => {
 
    console.log(`${client.user.username} is online.`);
    client.user.setActivity("/help | Officiele SCGCRAFT bot!", { type: "PLAYING" });
 
});
 
client.on("message", async message => {
 
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;
 
    var prefix = botConfig.prefix;
 
    var messageArray = message.content.split(" ");
 
    var command = messageArray[0];

    var arguments = messageArray.slice(1);


    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);


    // if (command === `${prefix}hallo`){
    //     return message.channel.send("Hallo!");
    // }
 
});