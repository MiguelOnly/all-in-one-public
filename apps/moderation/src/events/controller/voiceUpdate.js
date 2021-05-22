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
 * @param {?} routesJson
 * @param {?} config
 * @return {undefined}
 */
module.exports = async (routesJson, config) => {
    if (!config.member.voice.channel) {
        return;
    }
    let userData = await arrow.f.getData(config.member.id);
    if (userData.suspect.timeEnds.voice == 0) {
        config.member.voice.setMute(false);
    } else {
        config.member.voice.setMute(true);
    }
};
