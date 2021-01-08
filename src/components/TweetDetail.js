import * as React from 'react'
import NewTweet from './NewTweet'
import Tweet from './Tweet'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function TweetDetail() {
    const { id } = useParams()
    const tweets = useSelector((state) => state.tweets)

    if (!Object.keys(tweets).includes(id)) {
        return (
            <h3>The tweet does not exist.</h3>
        )
    }

    const tweet = tweets[id]

    return (
        <React.Fragment>
            <Tweet id={id} />
            <NewTweet replyingTo={id} />
            {tweet.replies.map((reply) => {
                return (
                    <Tweet key={reply} id={reply} />
                )
            })}
        </React.Fragment>
    )
}