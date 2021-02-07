
export default {

  namespace: 'infoArea',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(( path ) => {
       if(path.location&&path.location.pathname==='/'){
         // console.dir('xxxxx')
         // return  false;
       }
      })
    },

  },

  effects: {

  },

  reducers: {

  },

};
