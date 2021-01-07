import { saveTweet, saveLikeToggle } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_TWEET = 'ADD_TWEET'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

export function handleAddTweet(tweet) {
    return (dispatch, getState) => {
        dispatch(showLoading())
        const { authedUser } = getState()
        return saveTweet({
            ...tweet,
            author: authedUser,
        })
            .then((tweet) => dispatch(addTweet(tweet)))
            .then(() => dispatch(hideLoading))
    }
}

export function toggleTweet(tweetInfo) {
    return {
        type: TOGGLE_TWEET,
        ...tweetInfo
    }
}

export function handleToggleTweet(tweetInfo) {
    return (dispatch) => {
        dispatch(showLoading())

        return saveLikeToggle(tweetInfo)
            .then(() => dispatch(toggleTweet(tweetInfo)))
            .then(() => dispatch(hideLoading()))
    }
}



