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
    aliases: ['gecmis'],
    type: 'register',
    reqRole: common.configs.guild.roles.managment.registrar,

    async execute(msg, args, defEmbed) {

        let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])

        if (!member)
            return msg.channel.send(defEmbed
                .setDescription('Etiket veya ID ile kullanıcı belirtiniz.'))

        defEmbed.setAuthor(`${msg.member.displayName} | Listeleme`, msg.author.displayAvatarURL())
            .setFooter(member.user.tag, member.user.displayAvatarURL())

        let userData = await arrow.f.getData(member.id)

        if (userData.oldRegs.length == 0)
            return msg.channel.send(defEmbed
                .setDescription(`${member} Üyesine ait kayıt geçmişi mevcut değil.`))

        let data = [
            ['S.M.', 'İ.&Y.', 'C.']
        ]

        userData.oldRegs.forEach(v => {
            let mod = app.client.users.cache.get(v.mod) || {
                tag: v.mod
            }
            data.push([`${userData.oldRegs.indexOf(v) + 1}.${mod.username.slice(0, 7)}`, `"${v.name}" ${v.age}`, v.gender.charAt(0)])
        })

        let listPanel = await msg.channel.send(defEmbed
            .setDescription(`${member} __Üyesine ait kayıt geçmişi;__\`\`\`js\n${arrow.f.table(data.slice(0, 10))}\`\`\`\n\`\`\`fix\nToplam "${userData.oldRegs.length}" kayıt bulundu.\`\`\``))

        if (data.length <= 10)
            return

        await listPanel.react('⬅️')
        await listPanel.react('➡️')

        let filter = (reaction, user) => user.id === msg.author.id

        let page = 0
        var collector = listPanel.createReactionCollector(filter, {
            time: 300000
        })

        setTimeout(() => {
            listPanel.edit('Bu mesaj aktifliğini yitirdi.')
        }, 300000)

        collector.on('collect', (reaction, user) => {

            reaction.users.remove(user).catch(console.error)

            switch (reaction.emoji.name) {
                case '⬅️':
                    page -= 10
                    let pageL = String(page).charAt(Number(String(page).length == 2 ? 1 : 0))
                    if (page >= 0 && pageL > 0 && pageL < 10)
                        page = arrow.f.completeNum(page)
                    if (page < 0)
                        page = list.length - 10
                    if ((page > 0 && page < 10) || page < 0)
                        page = 0
                    break
                case '➡️':
                    page += 10
                    if (page >= list.length)
                        page = 0
            }

            listPanel.edit(defEmbed
                .setDescription(`\`\`\`js\n${arrow.f.table(list.slice(page, page + 10))}\`\`\``))

        })


    }
}