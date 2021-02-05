import React from 'react';
import { connect } from 'dva';
import Login from "../components/Login";

const LoginPage=(props)=>{
  return <Login {...props}/>
}


LoginPage.propTypes = {
};

const mapStateToProps=(state,loading)=>{
  return {
    userInfo:state.login.userInfo,
    loading
  }
}


export default connect(mapStateToProps)(LoginPage);
