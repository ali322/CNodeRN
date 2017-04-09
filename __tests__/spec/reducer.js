import * as constants from '../../app/module/topic/constant'
import {topicsReducer,initialState} from '../../app/module/topic/reducer'

describe('topic reducer',()=>{
    it(`should handle ${constants.RESPONSE_TOPICS}`,()=>{
        let response = {
            "success": true,
            "data": []
        }
        let action = {
            type: constants.RESPONSE_TOPICS,
            payload: { "code": "", "pageIndex": 1, ret: response }
        }
        let nextState = topicsReducer(initialState,action)
        expect(nextState.topicsFetched).toBe(true)
    })
})