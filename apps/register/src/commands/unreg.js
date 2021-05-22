`coded by
███╗   ███╗██╗ ██████╗ ██╗   ██╗███████╗██╗     
████╗ ████║██║██╔════╝ ██║   ██║██╔════╝██║     
██╔████╔██║██║██║  ███╗██║   ██║█████╗  ██║     
██║╚██╔╝██║██║██║   ██║██║   ██║██╔══╝  ██║     
██║ ╚═╝ ██║██║╚██████╔╝╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
#4103 OPEN SOURCE FOR THIS FILE`

module.exports = {

    name: 'kayıtsız',
    type: 'register',
    reqRole: common.configs.guild.roles.managment.registrar,

    async execute(msg, args, defEmbed) {

        let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])

        if (!member)
            return msg.channel.send(defEmbed
                .setDescription('Etiket veya ID ile kullanıcı belirtiniz.'))

        if (member.roles.cache.get(common.configs.guild.roles.public.jail))
            return msg.channel.send(defEmbed
                .setDescription(`${member} üyesi şu anda jail rolüne sahip. Kayıtsıza atılamaz.`))


        try {
            await member.roles.set([])
        } catch (err) { }

        member.roles.add(common.configs.guild.roles.public.unregister)
        await member.setNickname(``, `${msg.author.tag} Tarafından kayıtsız olarak ayarlandı.`)

        msg.channel.send(defEmbed
            .setAuthor(`${msg.member.displayName} | İşlem`, msg.author.displayAvatarURL())
            .setDescription(`${member} üyesi kayıtsız olarak ayarlandı.`)
            .setFooter(`userID ${member.id}`, member.user.displayAvatarURL())
        )

    }

}