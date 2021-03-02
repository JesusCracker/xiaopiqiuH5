import {queryAppList} from "../services/api";

export default {

    namespace: 'download',

    state: {
        defaultParams: {
            page: 1,
            limit: 10,
        },
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
        },
    },

    effects: {
        * app({payload}, {call, put}) {  // eslint-disable-line
            return  yield call(queryAppList, payload);
       /*     yield put({
                type: 'save',
                payload: response,
            });*/
        },
    },

    reducers: {
        save(state, action) {
            return {...state, appList: action.payload};
        },
    },

};
