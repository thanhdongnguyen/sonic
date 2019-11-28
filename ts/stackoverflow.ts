import Request from './libs/request'
import Message from './libs/message'


export default class Stackoverflow {

    static order: string = "desc"
    static sort: string = "activity"
    static site: string = "stackoverflow"
    static pagesize: number = 2

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
            return {success: false, message: Message.error(500)}
        }

        if (!results.data.items) {
            return {success: true, data: []}
        }

        return {success: true, data: results.data.items}
    }
}