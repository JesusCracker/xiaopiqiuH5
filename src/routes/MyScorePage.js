import React from 'react';
import { connect } from 'dva';
import MyScore from "../components/MyScore";

const MyScorePage=(props)=>{
  return <MyScore {...props}/>
}


MyScorePage.propTypes = {
};

export default connect()(MyScorePage);
