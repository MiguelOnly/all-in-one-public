`coded by
███╗   ███╗██╗ ██████╗ ██╗   ██╗███████╗██╗     
████╗ ████║██║██╔════╝ ██║   ██║██╔════╝██║     
██╔████╔██║██║██║  ███╗██║   ██║█████╗  ██║     
██║╚██╔╝██║██║██║   ██║██║   ██║██╔══╝  ██║     
██║ ╚═╝ ██║██║╚██████╔╝╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
#4103 OPEN SOURCE FOR THIS FILE`

module.exports = async member => {

    if (member.user.bot || member.guild.id !== common.configs.guild.guild) return

    try {
        member.roles.add(common.configs.guild.roles.public.unregister)
    } catch (error) { }

    let regChannel = member.guild.channels.cache.get(common.configs.guild.channels.public.registryChat)

    let humanize = modules.humanize(Date.now() - member.user.createdTimestamp, { language: 'tr', largest: 2, round: true })
    let moment = modules.moment(member.user.createdAt).format('YYYY/MM/DD HH:mm')

    regChannel.send(modules.ctags.stripIndents`
    <a:moryildiz:845671771394801694> ${member} Aramıza Hoş Geldin <a:tag22:833709644156895242>
    Seninle beraber sunucumuz ${member.guild.memberCount} üye sayısına ulaştı.

    Hesabın ${moment} tarihinde (${humanize} önce) oluşturulmuş. <a:onayland:829238960945102849>

    <#823945129576497233> kanalına göz atmayı unutmayınız.
    <@&823945128800157740> ve <@&823945128782725199> Rolündeki yetkililerimiz seninle ilgilenecektir.

    Kayıt olduktan sonra kuralları okuduğunuzu kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünede bulundurarak yapacağız. <a:tag22:833709644156895242>
    `
    )

}