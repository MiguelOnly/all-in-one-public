`coded by
███╗   ███╗██╗ ██████╗ ██╗   ██╗███████╗██╗     
████╗ ████║██║██╔════╝ ██║   ██║██╔════╝██║     
██╔████╔██║██║██║  ███╗██║   ██║█████╗  ██║     
██║╚██╔╝██║██║██║   ██║██║   ██║██╔══╝  ██║     
██║ ╚═╝ ██║██║╚██████╔╝╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
#4103 OPEN SOURCE FOR THIS FILE`

module.exports = {

    name: 'unsus',
    type: 'moderation',
    reqRole: common.configs.guild.roles.managment.muteSraff,

    async execute(msg, args, defEmbed) {

        let member = msg.mentions.members.first() || msg.guild.members.cache.get(args.filter(a => a.length >= 16 && parseInt(a) == a)[0])
        if (!member)
            return msg.channel.send(defEmbed
                .setDescription('Üyeyi etiketle veya id belirt'))

        let userData = await arrow.f.getData(member.id)
        let timeEnds = userData.suspect.timeEnds

        if (timeEnds.chat == 0 && timeEnds.voice == 0 && timeEnds.jail == 0)
            return msg.channel.send(defEmbed
                .setDescription(`${member} Üyesi şu an herhangi bir ceza içinde değil.`))

        if (!['c', 'v', 'j'].some(t => msg.content.includes(t)))
            return msg.channel.send(defEmbed
                .setDescription('Unmute türünü belirtin [`c`, `v`, `j`]'))

        if (userData.suspect.history.map(v => v.type).includes('All'))
            return msg.channel.send(defEmbed
                .setDescription(`${member} Üyesinin susturma geçmişinde \`All\` türü ile işaretlenen önemli bir cezası var, kaldırılamaz.`))

        let type

        if (msg.content.includes('c') && timeEnds.chat > Date.now()) {
            type = 'Chat'
            timeEnds.chat = 1
        } else if (msg.content.includes('v') && timeEnds.voice > Date.now()) {
            type = 'Voice'
            timeEnds.voice = 1
        } else if (msg.content.includes('j') && msg.member.roles.cache.get(common.configs.guild.roles.managment.jailSraff)) {
            member.roles.remove(common.configs.guild.roles.public.jail)
            member.roles.add(common.configs.guild.roles.public.unregister)
            member.setNickname('')
        }

        if (type) {
            let lastRes = userData.suspect.history.filter(v => v.type == type)
            userData.suspect.history = userData.suspect.history.filter(v => v !== lastRes[lastRes.length - 1])
            userData.save()
        }

    }

}