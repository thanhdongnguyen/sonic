import Request from './libs/request'
import Message from './libs/message'


export default class Stackoverflow {

    static async search(text: string) {
        const url = `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${text}&site=stackoverflow&pagesize=2`

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