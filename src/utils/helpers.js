export const MAX_TWEET_LENGTH = 280

export function formatDate(timestamp) {
    const date = new Date(timestamp)
    const time = date.toLocaleTimeString('en-US')
    return `${time.substr(0, 4)} ${time.slice(-2)} | ${date.toLocaleDateString()}`
}