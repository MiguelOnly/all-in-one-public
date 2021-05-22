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
 * @param {!Object} data
 * @return {undefined}
 */
module.exports = async (data) => {
    if (data.guild.id !== common.configs.guild.guild) {
        return;
    }
    let $ = await arrow.f.getData(data.id);
    let susPoint = $.suspect.history.map((upperEntry) => {
        return upperEntry.time;
    }).reduce((h0, a) => {
        return h0 + a;
    }, 0);
    if (susPoint > 250 || $.suspect.jail == true) {
        await data.roles.set([]);
        data.roles.add(common.configs.guild.roles.public.jail);
        return;
    }
    if ($.suspect.timeEnds.chat !== 0) {
        data.roles.add(common.configs.guild.roles.public.chatMute);
    }
    if ($.suspect.timeEnds.voice !== 0) {
        data.roles.add(common.configs.guild.roles.public.voiceMute);
    }
};
