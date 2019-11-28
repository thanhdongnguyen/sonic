const TEXTS = {

    401: "Unauthorization",
    500: "An error occurred during processing, please try again later"
}

export default class Message {

    static error(code: number) {
        if (!TEXTS[code]) {
            return "An error occurred during processing, please try again later"
        }
        return TEXTS[code]
    }
}