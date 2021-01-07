import { ADD_TWEET, RECEIVE_TWEETS, TOGGLE_TWEET } from '../actions/tweets'

export default function tweets(state = {}, action) {

    switch (action.type) {
        case RECEIVE_TWEETS:
            return {
                ...state,
                ...action.tweets
            }
        case ADD_TWEET:
            const newTweet = action.tweet

            let repliedTweet = {}
            if (newTweet.replyingTo) {
                repliedTweet = {
                    [newTweet.replyingTo]: {
                        ...state[newTweet.replyingTo],
                        replies: [newTweet.id].concat(state[newTweet.replyingTo].replies)
                    }
                }
            }

            return {
                ...state,
                [newTweet.id]: newTweet,
                ...repliedTweet
            }
        case TOGGLE_TWEET:
            const { id, authedUser, hasLiked } = action

            return {
                ...state,
                [id]: {
                    ...state[id],
                    likes: hasLiked === true
                        ? state[id].likes.filter((user) => user !== authedUser)
                        : state[id].likes.concat([authedUser])
                }
            }
        default:
            return state
    }
}