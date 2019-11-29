import Telegraf, {ContextMessageUpdate} from 'telegraf'
import Stackoverflow from './stackoverflow'
import Message from './libs/message'
import Text from './libs/text'

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({path: path.join(__dirname, "..", '.env')})



class Bot {

    async launch() {
        const bot: Telegraf<ContextMessageUpdate> = new Telegraf(process.env.BOT_TOKEN)
        bot.catch((error, ctx) => {
            console.log(error)
            ctx.reply(Message.error(500))
        })
        bot.start(this.botStart)
        bot.help(this.botHelp)
        bot.command("/search", await this.search)
        bot.launch()
    }

    botStart(ctx: ContextMessageUpdate) {
        ctx.reply(Message.error(100))
    }
    botHelp(ctx: ContextMessageUpdate) {
        ctx.reply(Message.error(101))
    }

    async search(ctx: ContextMessageUpdate): Promise<void> {
        const input = Text.parseInput(ctx.message.text)

        const results = await Stackoverflow.search(input)
        if (!results.success) {
            ctx.reply(Message.error(102))
        }
        ctx.replyWithMarkdown(Stackoverflow.show(results.data))
        return
    }
}

const bot = new Bot()
bot.launch()