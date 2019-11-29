import Request from './libs/request'
import Message from './libs/message'

import * as _ from 'lodash'


export default class Stackoverflow {

    static order: string = "desc"
    static sort: string = "activity"
    static site: string = "stackoverflow"
    static pagesize: number = 4

    static async search(text: string) {
        const url = `https://api.stackexchange.com/2.2/search?order=${Stackoverflow.order}&sort=${Stackoverflow.sort}&intitle=${text}&site=${Stackoverflow.site}&pagesize=${Stackoverflow.pagesize}`

        const results: {
            success?: boolean,
            status_code?: number,
            data?: {
                items: []
            },
            err?: string
        } = await Request.get(url)

        if (!results.success) {
            return {success: false, message: results.err}
        }

        if (!results.data.items) {
            return {success: true, data: []}
        }

        return {success: true, data: results.data.items}
    }

    static show(results = []): string {
        let message = ""
        if (results.length == 0) {
            message = "Sorry, I couldn't find any matches"
        }
        for (let item in results) {
            const tags = results[item].tags ? results[item].tags.join(", ") : ""
            if (tags) {
                message += `\`Tags\`: ${tags}\n`
            }

            message += `\`Title\`: ${_.startCase(results[item].title)}\n`
            message += `\`Link\`: ${results[item].link}\n`
            message += `\`Reputation\`: ${results[item].owner.reputation}\n`
            message += `\`View count\`: ${results[item].view_count}\n`
            message += "\n\n\n"
        }
        return message
    }
}