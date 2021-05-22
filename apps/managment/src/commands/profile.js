module.exports = {

    name: 'p',

    async execute(msg, args, defEmbed) {

        let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member
        let userData = await arrow.f.getData(member.id)

        let permData = common.configs.guild.roles.managment.ranks
        let values = Object.values(permData)

        if (!member.roles.cache.some(r => values.map(v => v.rol).includes(r.id)))
            return msg.channel.send(defEmbed.setDescription('Bu komut sadece yetkililier içindir'))

        let messages = []
        let voices = []
        userData.stat.days.forEach(v => {
            messages.push(v.messages)
            voices.push(v.voice)
        })

        let mod = userData.mod
        let percentXp = Math.floor((mod.level.xp / (mod.level.current * 1000)) * 100) || 0

        let emojis = common.configs.guild.options.emojis.bars

        const getEmoji = (v) => {
            let e = app.client.emojis.cache.get(v)
            let a = e.animated ? 'a' : ''
            return `<${a}:${e.name}:${e.id}>`
        }

        let bar = `${percentXp > 0 ? getEmoji(emojis.filled.head) : getEmoji(emojis.blank.head)}${getEmoji(emojis.filled.mid).repeat(percentXp / 15)}${getEmoji(emojis.blank.mid).repeat(7 - percentXp / 15)}${percentXp == 100 ? getEmoji(emojis.filled.end) : getEmoji(emojis.blank.end)} ${percentXp}%`

        let current = values.filter(r => member.roles.cache.some(mr => r.rol == mr.id))[0]
        let next = values[values.indexOf(current) + 1]
        let currentRank = msg.guild.roles.cache.get(current.rol)
        let nextRank = msg.guild.roles.cache.get(next.rol)

        defEmbed
            .setAuthor(`${member.displayName} | Yetkili bilgileri`, member.user.displayAvatarURL())
            .setDescription(modules.ctags.stripIndents`
            **✧** Kayıt: \`${mod.op.register}\`
            **✧** Davet: \`${mod.op.invite.server}\`
            **✧** Taglı Üye: \`${mod.op.invite.specialTag}\`
            **✧** Mesaj: \`${messages.reduce((a, b) => a + b, 0)}\`
            **✧** Ses: \`${arrow.f.defHumanize(voices.reduce((a, b) => a + b, 0))}\`
            `)
            .addField(`Seviye Durumu`, modules.ctags.stripIndents`
            Seviye: \`${mod.level.current}\` | \`${mod.level.xp}/${mod.level.current * 1000}\`
            ${bar}`)

        if (currentRank && nextRank) defEmbed.addField('Yetki Durumu', `Şu an ${currentRank} rolündesin ${nextRank} rolüne ulaşmak için \`${(mod.level.current * 1000) - mod.level.xp}\` puana daha ihtiyacın var`)

        msg.channel.send(defEmbed)

    },

}