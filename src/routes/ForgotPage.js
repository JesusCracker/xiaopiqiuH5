import React from 'react';
import { connect } from 'dva';
import Forgot from "../components/Forgot";

const RegisterPage=(props)=>{
  return <Forgot {...props}/>
}


RegisterPage.propTypes = {
};

export default connect()(RegisterPage);
