import React from 'react';
import { connect } from 'dva';
import Counter from '../components/Counter';
import PropTypes from 'prop-types'

const CounterPage = ({dispatch,counter}) => {
  return (
    <div>
      <p>Counter</p>
      <Counter dispatch={dispatch} counter={counter}/>
    </div>
  )
}

CounterPage.propTypes = {
  counter:PropTypes.object
};

const mapStateToProps=(state)=>{
  return {
    counter:state.counter,
  }
}

export default connect(mapStateToProps)(CounterPage);
