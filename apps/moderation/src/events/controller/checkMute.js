`coded by
███╗   ███╗██╗ ██████╗ ██╗   ██╗███████╗██╗     
████╗ ████║██║██╔════╝ ██║   ██║██╔════╝██║     
██╔████╔██║██║██║  ███╗██║   ██║█████╗  ██║     
██║╚██╔╝██║██║██║   ██║██║   ██║██╔══╝  ██║     
██║ ╚═╝ ██║██║╚██████╔╝╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
#4103 OPEN SOURCE FOR THIS FILE`

'use strict';
/**
 * @return {undefined}
 */
module.exports = () => {
    setInterval(async () => {
        let eCfgEl = await common.data.users.find().exec();
        eCfgEl.filter((canCreateDiscussions) => {
            let botMsg = canCreateDiscussions.suspect.timeEnds;
            return botMsg.chat < Date.now() && botMsg.chat !== 0 || botMsg.voice < Date.now() && botMsg.voice !== 0;
        }).forEach((userData) => {
            let guild = app.client.guilds.cache.get(common.configs.guild.guild);
            let member = guild.members.cache.get(userData.user);
            let oFooter;
            let type;
            let oldHeros;
            let botMsg = userData.suspect.timeEnds;
            if (botMsg.chat < Date.now() && botMsg.chat !== 0) {
                /** @type {number} */
                botMsg.chat = 0;
                oldHeros = common.configs.guild.roles.public.chatMute;
                /** @type {string} */
                type = "Chat Mute";
            }
            if (botMsg.voice < Date.now() && botMsg.voice !== 0) {
                /** @type {number} */
                botMsg.voice = 0;
                oldHeros = common.configs.guild.roles.public.voiceMute;
                /** @type {string} */
                type = "Voice Mute";
                if (member) {
                    if (member.voice.channel) {
                        member.voice.setMute(false);
                    } else {
                        /** @type {string} */
                        oFooter = "\u00dcye herhangi bir sesli kanalda olmad\u0131\u011f\u0131 i\u00e7in mikrofonu a\u00e7\u0131lamad\u0131 fakat herhangi bir sesli kanala ba\u011fland\u0131\u011f\u0131 zaman a\u00e7\u0131lacak.";
                    }
                }
            }
            if (!member) {
                /** @type {string} */
                oFooter = "Kullan\u0131c\u0131 sunucuda bulunamad\u0131.";
            }
            if (type) {
                if (member) {
                    member.roles.remove(oldHeros);
                }
                let oPage = (new modules.discord.MessageEmbed).setColor("2F3136").setDescription(`<@${userData.user}> (\`${userData.user}\`) \u00dcyesinin \`${type}\` cezas\u0131 sona erdi.`);
                if (oFooter) {
                    oPage.setFooter(oFooter);
                }
                let navControl = guild.channels.cache.get(common.configs.guild.channels.managment.muteLog);
                navControl.send(oPage);
            }
            userData.save();
        });
    }, 10000);
};
