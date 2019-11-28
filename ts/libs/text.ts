

export default class Text {

    static parseInput(message: string): string {
        return message.replace(/\/[A-z0-9]+\@[A-z0-9\S]+/i, '').trim()
    }
}