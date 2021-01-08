import * as React from 'react'
import { useSelector } from 'react-redux'
import Tweet from '../components/Tweet'

export default function Tweets() {
    const users = useSelector(state => state.users)
    const tweets = useSelector(state => state.tweets)
    const tweetList = Object.keys(tweets)
        .map(id => tweets[id])
        .sort((a, b) => b.timestamp - a.timestamp)

    return (
        <ul>
            {tweetList.map((tweet) => {
                return (
                    <Tweet key={tweet.id} id={tweet.id} />
                )
            })
            }
        </ul>
    )
}

