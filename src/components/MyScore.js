import React, {Component} from 'react';
import {Card, Button, Toast, Flex, NavBar, Icon} from 'antd-mobile';
import queryString from 'query-string'
import './MyScore.less'

import 积分图片 from '../assets/h5-我的积分-图片.png';


class MyScore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: null
    };
  }

  componentDidMount() {
    const {location, dispatch} = this.props;
    const params = queryString.parse(location.search);
    if (params && 'goldCoin' in params) {
      this.setState({
        score: params.goldCoin,
      })
    }
  }

  render() {
    const {history} = this.props;
    const {score}=this.state;
    return (
      <div className={'container'}>
        <NavBar
          mode="light"
        >我的积分</NavBar>
        <Card className={'containInner'}>
          <div className={'scoreInner'}>
            <div>我的积分</div>
            <div className={'score'}>{score}</div>
          </div>
        </Card>
        <div className={'bg_jifen'}>
          <img src={积分图片} alt=""/>
          <div className={'more'}>领更多积分，请登录小皮球APP</div>
        </div>
        <Button
          className={'download'}
          type='primary'
          style={{borderRadius: '50px'}}
          onClick={() => this.handleReset()}
        >
          下载小皮球APP
        </Button>


      </div>
    );
  }
}

MyScore.propTypes = {};

export default MyScore;
