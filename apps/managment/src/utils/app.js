app = {}
app.client = new modules.discord.Client()
app.configs = require('../../configs.json')
app.commands = new modules.discord.Collection()