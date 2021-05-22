`coded by
███╗   ███╗██╗ ██████╗ ██╗   ██╗███████╗██╗     
████╗ ████║██║██╔════╝ ██║   ██║██╔════╝██║     
██╔████╔██║██║██║  ███╗██║   ██║█████╗  ██║     
██║╚██╔╝██║██║██║   ██║██║   ██║██╔══╝  ██║     
██║ ╚═╝ ██║██║╚██████╔╝╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
#4103 OPEN SOURCE FOR THIS FILE`

module.exports = {

    name: 'geçmiş',
    type: 'moderation',
    reqRole: common.configs.guild.roles.managment.muteSraff,

    async execute(msg, args, defEmbed) {

        let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])

        if (!member)
            return msg.channel.send(defEmbed
                .setDescription('Öncelikle bir üye etiketleyin veya ID belirtin.'))

        let userData = await arrow.f.getData(member.id)

        if (userData.suspect.history.length < 1)
            return msg.channel.send(defEmbed
                .setDescription(`${member} üyesine ait ceza geçmişi bulunmuyor.`))

        let tableData = [['Ty.', 'R.', 'T.', 'M.']]

        userData.suspect.history.forEach(v => {
            let mod = app.client.users.cache.get(v.mod) || { tag: v.mod }
            tableData.push([v.type, v.reason, v.time + ' Dk', mod.tag])
        })

        let susPoint = userData.suspect.history.map(v => v.time).reduce((a, b) => a + b)

        msg.channel.send(defEmbed
            .setAuthor(`${msg.member.displayName} | Moderasyon`, msg.author.displayAvatarURL())
            .setDescription(`${member} __Üyesinin ceza kaydı;__\`\`\`js\n${arrow.f.table(tableData)}\`\`\`\n> CP: \`${susPoint}\``)
            .setFooter(`userID: ${member.id}`, member.user.displayAvatarURL()))
    }

}