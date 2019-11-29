const TEXTS = {

    100: "Welcome to Sonic Bot. Currently we only support searching on stackoverflow",
    101: "Please enter text and waitting results",
    102: "Sorry, search result not success, please try again",
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