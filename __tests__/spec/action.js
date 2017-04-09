import nock from 'nock'
import * as constants from '../../app/module/topic/constant'
import * as actions from '../../app/module/topic/action'
import configureStore from "redux-mock-store"
import thunkMiddleware from 'redux-thunk'

let mockStore = configureStore([thunkMiddleware])

function cleanActions(actions){
    return actions.map(v=>{
        if(v.respondAt){
            delete v.respondAt
        }
        return v
    })
}

describe('actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })
    it('fetch topics', () => {
        let response = {
            "success": true,
            "data": []
        }
        let expectedActions = [
            { type: constants.REQUEST_TOPICS },
            { type: constants.RESPONSE_TOPICS, payload: { "code": "", "pageIndex": 1, ret: response } }
        ]
        const store = mockStore()

        nock("http://cnodejs.org").get(uri => uri.indexOf("/api/v1/topics") >= 0).reply(200, response)
        return store.dispatch(actions.fetchTopics()).then(() => {
            expect(cleanActions(store.getActions())).toEqual(expectedActions)
        })
    })
})