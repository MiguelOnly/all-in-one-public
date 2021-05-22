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
 * @param {!Object} user
 * @return {undefined}
 */
module.exports = async (user) => {
    if (user.author.bot || user.guild.id !== common.configs.guild.guild) {
        return;
    }
    let $scope = await arrow.f.getData(user.author.id, true);
    let day = ["Pazar", "Pzt", "Sal\u0131", "\u00c7ar", "Per", "Cuma", "Cts"];
    let today = new Date;
    today.setHours(today.getHours() + 3);
    day = day[today.getDay()] + ` ${today.getDate()}`;
    let config = {};
    config.days = $scope.stat.days.get(day) || {
        messages: 0,
        voice: 0
    };
    config.categories = $scope.stat.categories.get(user.channel.parentID) || {
        messages: 0,
        voice: 0
    };
    $scope.stat.days.set(day, {
        messages: config.days.messages + 1,
        voice: config.days.voice
    });
    if ($scope.stat.days.size > 7) {
        /** @type {!Map} */
        $scope.stat.days = new Map(Array.from($scope.stat.days).slice(1));
    }
    if (user.channel.parent) {
        $scope.stat.categories.set(user.channel.parentID, {
            messages: config.categories.messages + 1,
            voice: config.categories.voice
        });
    }
    $scope.stat.total.message += 1;
    let equalizerPresets = common.configs.guild.roles.managment.ranks;
    let values = Object.values(equalizerPresets);
    if (user.member.roles.cache.some((r) => {
        return values.map((Sha1) => {
            return Sha1.rol;
        }).includes(r.id);
    })) {
        let event_patch = values[values.length - 1].rol;
        if (!user.member.roles.cache.get(event_patch)) {
            $scope.mod.level.xp += common.configs.guild.options.ranking.activity.msg;
        }
    }
    await arrow.f.checkLevel($scope, user.member);
    $scope.save();
};
