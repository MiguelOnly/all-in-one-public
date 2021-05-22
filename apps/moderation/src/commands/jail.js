`coded by
███╗   ███╗██╗ ██████╗ ██╗   ██╗███████╗██╗     
████╗ ████║██║██╔════╝ ██║   ██║██╔════╝██║     
██╔████╔██║██║██║  ███╗██║   ██║█████╗  ██║     
██║╚██╔╝██║██║██║   ██║██║   ██║██╔══╝  ██║     
██║ ╚═╝ ██║██║╚██████╔╝╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
#4103 OPEN SOURCE FOR THIS FILE`

module.exports = {

    name: 'jail',
    type: 'moderation',
    reqRole: common.configs.guild.roles.managment.jailStaff,

    async execute(msg, args, defEmbed) {

        let member = msg.mentions.members.first() || msg.guild.members.cache.get(args.filter(a => a.length >= 16 && parseInt(a) == a)[0])

        if (!member)
            return msg.channel.send(defEmbed
                .setDescription('Öncelikle bir üye etiketleyin veya ID belirtin.'))

        if (msg.member.roles.highest.rawPosition <= member.roles.highest.rawPosition)
            return msg.channel.send(defEmbed
                .setDescription('Kendinle aynı yetkide veya yüksekte olan birisine bu işlemi uygulayamazsın.'))

        let userData = await arrow.f.getData(member.id, true)
        userData.suspect.jail = true
        userData.save()

        try {
            await member.roles.set([])
            await member.roles.add(common.configs.guild.roles.public.jail)
        } catch (error) { }

        let jailLog = msg.guild.channels.cache.get(common.configs.guild.channels.managment.jailLog)

        jailLog.send(defEmbed
            .setAuthor(`${msg.member.displayName} | Jail`, msg.author.displayAvatarURL())
            .setDescription(`${member} (\`${member.id}\`) üyesi jail'e gönderildi.`))

    }

}