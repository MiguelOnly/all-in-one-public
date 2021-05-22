`coded by
███╗   ███╗██╗ ██████╗ ██╗   ██╗███████╗██╗     
████╗ ████║██║██╔════╝ ██║   ██║██╔════╝██║     
██╔████╔██║██║██║  ███╗██║   ██║█████╗  ██║     
██║╚██╔╝██║██║██║   ██║██║   ██║██╔══╝  ██║     
██║ ╚═╝ ██║██║╚██████╔╝╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
#4103 OPEN SOURCE FOR THIS FILE`

let $ = modules.mongo.Schema({
    user: String,
    mod: {
        op: {
            register: Number,
            invite: {
                server: Number,
                specialTag: Number
            }
        },
        level: {
            current: Number,
            xp: Number
        }
    },
    oldRegs: [],
    suspect: {
        timeEnds: {
            chat: Number,
            voice: Number,
        },
        history: [],
        jail: Boolean
    },
    stat: {
        days: Map,
        categories: Map,
        total: {
            message: Number,
            voice: Number
        }
    }
}, {
    versionKey: false
})

module.exports = modules.mongo.model('users', $)