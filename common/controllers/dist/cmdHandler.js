`coded by
███╗   ███╗██╗ ██████╗ ██╗   ██╗███████╗██╗     
████╗ ████║██║██╔════╝ ██║   ██║██╔════╝██║     
██╔████╔██║██║██║  ███╗██║   ██║█████╗  ██║     
██║╚██╔╝██║██║██║   ██║██║   ██║██╔══╝  ██║     
██║ ╚═╝ ██║██║╚██████╔╝╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
#4103 OPEN SOURCE FOR THIS FILE`

module.exports = {

    async toDo(msg, app) {

        if (!msg.content.toLowerCase().startsWith(app.configs.prefix) || msg.author.bot) return

        const args = msg.content
            .slice(app.configs.prefix.length)
            .trim()
            .split(' ')

        const commandName = args.shift().toLowerCase()
        const command = app.commands.get(commandName) || app.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        if (!command) return

        if (msg.member.roles.cache.get(command.reqRole) || msg.member.hasPermission('ADMINISTRATOR')) {

            defEmbed = new modules.discord.MessageEmbed().setColor("2F3136");

            msg.channel.startTyping();

            let exc = command.execute.toString()

            exc = exc
                .slice(exc.indexOf('(') + 1, exc.indexOf(')'))
                .replace(/,/g, '')
                .split(' ')
                .map(c => eval(c))

            command.execute(...exc)

            msg.channel.stopTyping();

        }

    }

}
