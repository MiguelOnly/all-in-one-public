`coded by
███╗   ███╗██╗ ██████╗ ██╗   ██╗███████╗██╗     
████╗ ████║██║██╔════╝ ██║   ██║██╔════╝██║     
██╔████╔██║██║██║  ███╗██║   ██║█████╗  ██║     
██║╚██╔╝██║██║██║   ██║██║   ██║██╔══╝  ██║     
██║ ╚═╝ ██║██║╚██████╔╝╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
#4103 OPEN SOURCE FOR THIS FILE`

require('./src/utils/app')

arrow.f.setup(app, 'moderation')

app.client.on('ready', require('./src/events/controller/checkMute'))
app.client.on('guildMemberAdd', require('./src/events/controller/join'))
app.client.on('voiceStateUpdate', require('./src/events/controller/voiceUpdate'))