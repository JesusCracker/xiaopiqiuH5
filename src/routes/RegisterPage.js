import React from 'react';
import { connect } from 'dva';
import Register from "../components/Register";

const RegisterPage=(props)=>{
  return <Register {...props}/>
}


RegisterPage.propTypes = {
};

export default connect()(RegisterPage);
