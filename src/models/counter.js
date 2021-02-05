
export default {

  namespace: 'counter',

  state: {
    count:1,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    add(state, action) {
      return {
        count: state.count+1,
      };
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
