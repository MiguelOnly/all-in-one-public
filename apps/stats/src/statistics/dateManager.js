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
        let winDoc = ["Pazar", "Pzt", "Sal\u0131", "\u00c7ar", "Per", "Cuma", "Cts"];
        let today = new Date;
        today.setHours(today.getHours() + 3);
        winDoc = winDoc[today.getDay()] + ` ${today.getDate()}`;
        eCfgEl.filter((name_and_stat) => {
            return !name_and_stat.stat.days.has(winDoc);
        }).forEach(($scope) => {
            $scope.stat.days.set(winDoc, {
                messages: 0,
                voice: 0
            });
            if ($scope.stat.days.size > 7) {
                /** @type {!Map} */
                $scope.stat.days = new Map(Array.from($scope.stat.days).slice(1));
            }
            $scope.save();
        });
    }, 600000);
};
