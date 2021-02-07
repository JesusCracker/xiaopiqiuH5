import {getVerifyCode, queryUserInfo, wxLogin, wxRegister, isVerified} from '../services/api';

export default {

  namespace: 'login',

  state: {},


  effects: {
    * getVerify({payload}, {call}) {
      yield call(getVerifyCode, payload);
    },

    * isRegistered({payload}, {call}) {
     return  yield call(isVerified, payload);
    },

    * saveUserInfo({payload}, {call, put}) {
      return yield call(queryUserInfo, payload);

      /*     yield put({
             type: 'save',
             payload: response,
           });*/
    },

    * loginByAccount({payload}, {call, put}) {
      return yield call(wxLogin, payload);
    },

    * register({payload}, {call, put}) {
      return yield call(wxRegister, payload);
    },

    * forgot({payload}, {call, put}) {
      return yield call(wxRegister, payload);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
  },

};
