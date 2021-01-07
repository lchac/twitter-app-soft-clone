import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { MAX_TWEET_LENGTH } from '../utils/helpers'
import { handleAddTweet } from '../actions/tweets'

export default function NewTweet({ replyingTo }) {
    const [toHome, setToHome] = React.useState(false)
    const [tweetText, setTweetText] = React.useState('')
    const dispatch = useDispatch()

    const onWritingTweet = (e) => {
        const text = e.target.value

        if (text.length <= MAX_TWEET_LENGTH) {
            setTweetText(text)
        }
    }

    const onSubmitTweet = (e) => {
        e.preventDefault()
        dispatch(handleAddTweet({
            text: tweetText,
            replyingTo
        }))

        setTweetText('')
        setToHome(replyingTo ? false : true)
    }

    if (toHome === true) {
        return <Redirect to='/' />
    }

    return (
        <form className="new-tweet">
            <textarea
                placeholder="What's happening?"
                className="textarea"
                maxLength="280"
                onChange={onWritingTweet}
                value={tweetText}>
            </textarea>
            {tweetText.length >= 180 &&
                <div className="tweet-length">{MAX_TWEET_LENGTH - tweetText.length}</div>
            }
            <button
                className="btn"
                type="submit"
                onClick={onSubmitTweet}
                disabled={tweetText.length === 0}>
                Submit
            </button>
        </form>
    )
}
