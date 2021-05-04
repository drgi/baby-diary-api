function parseError({ message }) {
    const parsedMessage = message
        .match(/[а-я0-9\s\,\.\-]+$/gi)?.join('')
        .trim()
    return parsedMessage ? parsedMessage : message    
}
module.exports = {
    parseError
}