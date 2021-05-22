`coded by
███╗   ███╗██╗ ██████╗ ██╗   ██╗███████╗██╗     
████╗ ████║██║██╔════╝ ██║   ██║██╔════╝██║     
██╔████╔██║██║██║  ███╗██║   ██║█████╗  ██║     
██║╚██╔╝██║██║██║   ██║██║   ██║██╔══╝  ██║     
██║ ╚═╝ ██║██║╚██████╔╝╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
#4103 OPEN SOURCE FOR THIS FILE`

module.exports = {

    name: 'top',
    type: 'stat',

    async execute(msg, args, defEmbed) {

        let data = await common.data.users.find().exec()

        let top = {
            weekly: {
                chat: [],
                voice: []
            },
            tot: {
                chat: [],
                voice: []
            }
        }

        if (['t', 'h'].some(t => args.includes(t))) {

            data.filter(v => msg.guild.members.cache.get(v.user)).forEach(v => {

                let values = Array.from(v.stat.days.values())
                let msgs = values.map(v => v.messages).reduce((a, b) => a + b, 0)
                let vcss = values.map(v => v.voice).reduce((a, b) => a + b, 0)

                top.weekly.chat.push({
                    user: v.user,
                    messages: msgs
                })

                top.tot.chat.push({
                    user: v.user,
                    messages: v.stat.total.message
                })

                top.weekly.voice.push({
                    user: v.user,
                    voice: vcss
                })

                top.tot.voice.push({
                    user: v.user,
                    voice: v.stat.total.voice
                })

            })

            let list = {
                chat: [],
                voice: []
            }
            let info

            if (args.includes('h')) {
                info = 'Haftalık',
                    top.weekly.chat.sort((a, b) => b.messages - a.messages)
                        .map((m, index) => `${index == 0 ? '🥇' : index == 1 ? '🥈' : index == 2 ? '🥉' : '`' + (index + 1) + '.`'} <@${m.user}> \`${m.messages}\``)
                        .forEach(l => list.chat.push(l))

                top.weekly.voice.sort((a, b) => b.voice - a.voice)
                    .map((m, index) => `${index == 0 ? '🥇' : index == 1 ? '🥈' : index == 2 ? '🥉' : '`' + (index + 1) + '.`'} <@${m.user}> \`${arrow.f.defHumanize(m.voice).replace('dakika', 'Dk.')}\``)
                    .forEach(l => list.voice.push(l))
            }

            if (args.includes('t')) {
                info = 'Genel',
                    top.tot.chat.sort((a, b) => b.messages - a.messages)
                        .map((m, index) => `${index == 0 ? '🥇' : index == 1 ? '🥈' : index == 2 ? '🥉' : '`' + (index + 1) + '.`'} <@${m.user}> \`${m.messages}\``)
                        .forEach(l => list.chat.push(l))

                top.tot.voice.sort((a, b) => b.voice - a.voice)
                    .map((m, index) => `${index == 0 ? '🥇' : index == 1 ? '🥈' : index == 2 ? '🥉' : '`' + (index + 1) + '.`'} <@${m.user}> \`${arrow.f.defHumanize(m.voice).replace('dakika', 'Dk.')}\``)
                    .forEach(l => list.voice.push(l))
            }

            msg.channel.send(defEmbed
                .setAuthor(`${msg.guild.name} ♕ ${info} Sıralama`)
                .addField('Chat', list.chat.slice(0, 10).join('\n') + `\n\n[${list.chat.indexOf(...list.chat.filter(v => v.includes(msg.author.id))) + 1}.](https://discord.gg/RZqDfnxvR9) ${msg.member} 📍`, true)
                .addField('Ses', list.voice.slice(0, 10).join('\n') + `\n\n[${list.voice.indexOf(...list.voice.filter(v => v.includes(msg.author.id))) + 1}.](https://discord.gg/RZqDfnxvR9) ${msg.member} 📍`, true)
            )

        } else
            msg.channel.send(defEmbed.setDescription('Sıralama türü belirtiniz: \`t, h\`'))

    }

}