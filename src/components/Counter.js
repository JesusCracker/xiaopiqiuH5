import React, {Component} from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: {count: {}}
    };

  }

  add = () => {
    const {dispatch} = this.props;
    dispatch({type: 'counter/add'})
  }

  render() {
    const {counter} = this.props;

    return (
      <div>
        <Card>
          <Card.Header
            title="This is title"
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            extra={<span>this is extra</span>}
          />
          <Card.Body>
            <div>This is content of `Card`</div>
          </Card.Body>
          <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
        </Card>

        <h1>{counter.count}</h1>
        <button onClick={() => {
          this.add()
        }}>+
        </button>
      </div>
    );
  }
}

Counter.propTypes = {};

export default Counter;
