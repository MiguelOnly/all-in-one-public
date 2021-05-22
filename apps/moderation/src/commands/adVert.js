`coded by
███╗   ███╗██╗ ██████╗ ██╗   ██╗███████╗██╗     
████╗ ████║██║██╔════╝ ██║   ██║██╔════╝██║     
██╔████╔██║██║██║  ███╗██║   ██║█████╗  ██║     
██║╚██╔╝██║██║██║   ██║██║   ██║██╔══╝  ██║     
██║ ╚═╝ ██║██║╚██████╔╝╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
#4103 OPEN SOURCE FOR THIS FILE`

module.exports = {

    name: 'ad.alert',
    type: 'moderation',
    reqRole: common.configs.guild.roles.managment.banStaff,

    async execute(msg, args, defEmbed) {

        let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])

        if (!member)
            return msg.channel.send(defEmbed
                .setDescription('Reklam ban işlemi yapılacak kişiyi etiketleyin veya ID belirtin.'))

        if (msg.member.roles.highest.rawPosition <= member.roles.highest.rawPosition)
            return msg.channel.send(defEmbed
                .setDescription('Kendinle aynı yetkide veya yüksekte olan birisine bu işlemi uygulayamazsın.'))

        defEmbed
            .setAuthor(`${msg.member.displayName} | Reklam Ban`, msg.author.displayAvatarURL())
            .setFooter(`userID: ${member.id}`, member.user.displayAvatarURL())

        let waitProof = await msg.channel.send(defEmbed
            .setDescription(`${member} Üyesini **Reklam** sebebi ile yasaklamak için 45 saniye içinde __ScreenShot__ bekleniyor.\n> q = İPTAL`))

        const filter = m => m.author.id == msg.author.id

        let proof = await msg.channel.awaitMessages(filter, { max: 1, time: 45000 })

        if (!proof.first()) return waitProof.edit('Zaman aşımı işlem iptal edildi.')

        if (proof.first().content == 'q') {
            waitProof.then(m => m.delete())
            msg.delete()
            proof.first().delete({ timeout: 1000 })
            return
        }

        if (proof.first().attachments.size == 0) {
            msg.channel.send('Geçersiz. İşlem iptal edildi')
                .then(m => m.delete({ timeout: 2500 }))
            waitProof.delete(), msg.delete()
            proof.first().delete({ timeout: 1000 })
        }

        proof.first().delete({ timeout: 2000 })
        var Attachment = (proof.first().attachments).array()

        msg.guild.channels.cache.get(common.configs.guild.channels.managment.banLog)
            .send(new modules.discord.MessageEmbed()
                .setColor('2F3136')
                .setTitle('Bir üye reklam sebebiyle yasaklandı')
                .addField('Üye', `${member.user.tag}\n\`${member.id}\``)
                .addField('Yetkili', msg.member)
                .setImage(Attachment[0].proxyURL))

        await waitProof.edit(defEmbed
            .setDescription(`\`${member.user.tag}\` Üyesi **Reklam** sebebi ile yasaklandı.\n__ScreenShot__ özel bir bölgeye yerleştirildi.`))

        member.ban({ reason: `${msg.author.tag} Tarafından reklam sebebiyle` })

    }

}