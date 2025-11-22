// index.js
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const express = require("express");

// ====== EXPRESS SERVER ======
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// ====== DISCORD BOT ======
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// ====== CONFIG ======
const TOKEN = process.env.TOKEN;
const WELCOME_CHANNEL_ID = "1441792111405043874";
const LEAVE_CHANNEL_ID = "1441792191809716274";

// ====== READY EVENT ======
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// ====== WELCOME NEW MEMBERS ======
client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
  if (!channel) return console.error("Welcome channel not found!");

  const embed = new EmbedBuilder()
    .setDescription(
`🌑 Dark Shadow MC — Welcome Message

🖤 Welcome to DARK SHADOW MC, ${member.user} 🖤
Step into the shadows… where power grows, alliances form, and legends rise.

━━━━━━━━━━━━━━━━━━
🕯️ ANNOUNCEMENTS
Stay updated with events & server news in ⁠ᴀɴɴᴏᴜɴᴄᴇᴍᴇɴᴛ🕯️ AT <#1399056992248533027>
━━━━━━━━━━━━━━━━━━
💀 GENERAL CHAT
Join the community of shadow-walkers in ⁠ɢᴇɴᴇʀᴀʟ-ᴄʜᴀᴛ💀AT  <#1370962957797687336>
━━━━━━━━━━━━━━━━━━
📜 RULES
Every shadow follows the code—read it in ⁠ʀᴜʟᴇꜱ📜 AT <#1337614633074167839>
━━━━━━━━━━━━━━━━━━
🗝️ IP & PORT
Enter the realm through ⁠ɪᴘ-ᴘᴏʀᴛ🗝️ THROUGH JUST TYPING IP
━━━━━━━━━━━━━━━━━━

🌑 Prepare yourself… The shadows are watching. 🌑`
    )
    .setImage("https://cdn.discordapp.com/attachments/1305377381464277005/1436019007642800300/standard.gif")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setColor("#00ffcc");

  channel.send({ embeds: [embed] });
});

// ====== GOODBYE MEMBERS ======
client.on("guildMemberRemove", (member) => {
  const channel = member.guild.channels.cache.get(LEAVE_CHANNEL_ID);
  if (!channel) return console.error("Goodbye channel not found!");

  const embed = new EmbedBuilder()
    .setDescription(`😢 **${member.user.tag}** has left **DARK SHADOW MC**. We’ll miss you! 👋`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setColor("#ff4d4d");

  channel.send({ embeds: [embed] });
});

// ====== LOGIN ======
client.login(TOKEN);
