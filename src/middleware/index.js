import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import logger from '../middleware/logger'

export default applyMiddleware(
    thunk,
    logger
)