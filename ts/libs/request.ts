import axios from 'axios'
import * as urlParse from 'url'


export default class Request {

    public static async get(url: string, query: object = {}, header: object = {}, hostProxy: string = '', portProxy: number = 80) {

        let queries = []

        for (let item in query) {
            queries.push(item+"="+query[item])
        }
        if (queries.length > 0) {
            url += `?${queries.join('&')}`
        }

        try {

            const result = await axios.get(url, {
                headers: header,
                proxy: hostProxy !== '' ?  {
                    host: hostProxy,
                    port: portProxy
                } : false
            })

            return {
                success : true,
                status_code: result.status,
                data: result.data
            }
        } catch(err) {

            if (!err.response) {

                throw new Error(JSON.stringify({
                    url, query, header, err: String(err)
                }))
            }

            return {
                success : false,
                status_code: err.response ? err.response.status : 500,
                err : err.response ? err.response.data : String(err)
            }
        }
    }

    public static async post(url: string, body: object = {}, header: object = {}, hostProxy: string = '', portProxy: number = 80) {

        try {


            const result = await axios.post(url, body, {
                headers: header,
                proxy: hostProxy !== '' ? {
                    host: hostProxy,
                    port: portProxy
                } : false
            })

            return {
                success: true,
                status_code: result.status,
                data: result.data
            }
        } catch(err) {

            if (!err.response) {

                throw new Error(JSON.stringify({
                    url, body, header, err: String(err)
                }))
            }

            return {
                success: false,
                status_code: err.response ? err.response.status : 500,
                err : err.response ? err.response.data : String(err)
            }
        }
    }
}