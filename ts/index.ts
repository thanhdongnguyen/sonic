import Telegraf from 'telegraf'
import Stackoverflow from './stackoverflow'
import Text from './libs/text'
import Display from './libs/display'

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({path: path.join(__dirname, "..", '.env')})



class Bot {

    async launch() {
        const bot = new Telegraf(process.env.BOT_TOKEN)
        bot.catch((error, ctx) => {
            console.log(error)
            ctx.reply("An error occurred during processing, please try again later")
        })
        bot.start(this.botStart)
        bot.help(this.botHelp)
        bot.command("/search", await this.search)
        bot.launch()
    }

    botStart(ctx) {
        ctx.reply("Welcome to Sonic Bot. Currently we only support searching on stackoverflow")
    }
    botHelp(ctx) {
        ctx.reply(`
            Please enter text and waitting results
        `)
    }

    async search(ctx) {
        const input = Text.parseInput(ctx.message.text)

        const results = await Stackoverflow.search(input)
        if (!results.success) {
            ctx.reply("Sorry, search result not success, please try again")
        }
        ctx.replyWithMarkdown(Display.show(results.data))
    }
}

const bot = new Bot()
bot.launch()