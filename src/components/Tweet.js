import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { formatDate } from '../utils/helpers'
import { handleToggleTweet } from '../actions/tweets'

export default function Tweet({ id }) {
    const history = useHistory()
    const dispatch = useDispatch()

    const authedUser = useSelector((state) => state.authedUser)
    const users = useSelector((state) => state.users)
    const tweets = useSelector((state) => state.tweets)

    const tweet = tweets[id]
    const authorUser = users[tweet.author]
    const parentAuthor = tweet.replyingTo ? tweets[tweet.replyingTo].author : null

    const replyTo = (e, id) => {
        e.preventDefault()
        history.push(`/tweet/${id}`)
    }

    const handleLike = (e, id, hasLiked) => {
        e.preventDefault()
        dispatch(handleToggleTweet({ id, hasLiked, authedUser }))
    }

    const hasLiked = tweet.likes.includes(authedUser)

    return (
        <Link to={`/tweet/${tweet.id}`} className='tweet'>
            <img src={authorUser.avatarURL} alt={`Avatar of ${authorUser.name}`} className="avatar" />
            <div className="tweet-info">
                <div>
                    <span>{authorUser.name}</span>
                    <div>{formatDate(tweet.timestamp)}</div>
                    {parentAuthor &&
                        <button className="replying-to" onClick={(e) => replyTo(e, tweet.id)}>
                            Replying to @{parentAuthor}
                        </button>
                    }
                    <p>{tweet.text}</p>
                </div>
                <div className="tweet-icons">
                    <TiArrowBackOutline className='tweet-icon' style={{ marginBottom: 3 }} />
                    <span>{tweet.replies.length}</span>
                    <button className="heart-button" onClick={(e) => handleLike(e, tweet.id, hasLiked)}>
                        {hasLiked === true
                            ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                            : <TiHeartOutline className='tweet-icon' />}
                    </button>
                    <span>{tweet.likes.length}</span>
                </div>
            </div>
        </Link>
    )
}