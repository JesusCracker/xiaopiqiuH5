import React, {PureComponent} from "react";
import {Card, NavBar, Icon} from 'antd-mobile';
import './Protocol.less'

class Protocol extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  render() {
    const {history} = this.props;
    return (
      <div className={"container1"}>
        <NavBar
          mode="light"
          icon={<Icon type="left"/>}
          onLeftClick={() => {  history.push('/register')}}
        >用户服务协议</NavBar>

        <Card className={'containInner1'}>
          <Card.Header
            title="用户服务协议"
            className={'cTitle'}
          />
          <Card.Body className={'cBody'}>
            <div
              className='{sentence} {sp}'>1.当活动开始后，任何用户都可在活动期间内点击“我要编辑”按钮，进入任一感兴趣的地域任务，成为该省任务编辑成员。只有一次加入机会，不可加入多个地域任务。加入后，您就可以在团队全部成员中看到自己了。没有点击“我要编辑”按钮，编辑对应任务中的词条不被计入本活动成绩。
            </div>
            <div
              className={'sentence'}>2.活动期间，您随时可以在已经加入的任务中编辑词条。你的编辑及贡献的优质版本，会计入个人成绩。由于词条编辑有一定的审核时间，活动页面数据每1小时更新一次，你的参与数据可能不会即时在页面显示，请耐心等待。
            </div>
            <div className={'sentence'}>3.词条编辑和优质版本以提交时间为准，须在活动时间之内。活动停止后，将有5个工作日处理优质词条，之后提交优质版本或复议的词条都不计入成绩。</div>
            <div className={'sentence'}>4.申请者在活动中有作弊等违反 百科协议 的行为，将被取消评奖资格。</div>
            <div
              className={'sentence'}>（注：无论是词条图片还是正文，都需要避免提供重复、矛盾、无源、虚假、信息价值较低，或含有违反百科发布内容的词条信息，并在对应的词条信息模块，正确进行内容填充。）
            </div>
          </Card.Body>

        </Card>
      </div>
    );
  }
}

Protocol.propTypes = {};

export default Protocol;
