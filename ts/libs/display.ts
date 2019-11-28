


export default class Display {
    static show(results = []): string {
        let message = ""
        if (results.length == 0) {
            message = "Sorry, I couldn't find any matches"
        }
        for (let item in results) {
            const tags = results[item].tags ? results[item].tags.join(", ") : ""
            if (tags) {
                message += `\`tags\`: ${tags}\n`
            }

            message += `\`title\`: ${results[item].title}\n`
            message += `\`link\`: ${results[item].link}\n`
            message += `\`reputation\`: ${results[item].owner.reputation}\n`
            message += `\`view count\`: ${results[item].view_count}\n`
            message += "\n\n\n"
        }
        return message
    }
}