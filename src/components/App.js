import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'
import Tweets from './Tweets'
import TweetDetail from './TweetDetail'
import NewTweet from './NewTweet'

export default function App() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authedUser === null)

  React.useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  return (
    <Router>
      <div className='container'>
        <Nav />
        {loading === true
          ? null
          : <div>
            <Route path="/" exact>
              <Tweets />
            </Route>
            <Route path="/new">
              <NewTweet />
            </Route>
            <Route path="/tweet/:id">
              <TweetDetail />
            </Route>
          </div>
        }
      </div>
    </Router>
  )
}