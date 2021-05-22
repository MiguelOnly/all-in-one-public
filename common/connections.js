`coded by
███╗   ███╗██╗ ██████╗ ██╗   ██╗███████╗██╗     
████╗ ████║██║██╔════╝ ██║   ██║██╔════╝██║     
██╔████╔██║██║██║  ███╗██║   ██║█████╗  ██║     
██║╚██╔╝██║██║██║   ██║██║   ██║██╔══╝  ██║     
██║ ╚═╝ ██║██║╚██████╔╝╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
#4103 OPEN SOURCE FOR THIS FILE`

require('./controllers/src/modules')
require('./controllers/src/common')
require('./controllers/src/arrow.f')

modules.mongo.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('Mongo bağlandı.'))

const run = a => {
    let status = require(`../apps/${a}/configs.json`).status
    if (status == 'ready') require(`../apps/${a}/index`)
}

run('managment')
run('moderation')
run('register')
run('stats')