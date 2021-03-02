import React, {Component} from 'react';
import {Card, InputItem, Button, Toast, Flex, Checkbox, NavBar, Icon} from 'antd-mobile';
import {createForm} from 'rc-form';
import './Forget.less'
import {routerRedux} from "dva/router";
import {Helmet} from 'react-helmet';
import HookFooter from "./SB";

import queryString from "query-string";

@createForm()
class Forgot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 59,
      loading: false,
      isAgree: false,
    };

  }

  componentDidMount() {

  }
  timer = null;

  handleReset = e => {
    // e.preventDefault();
    const {location, history, form, dispatch} = this.props;
    const {validateFields} = form;
    validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      if (typeof localStorage !== 'undefined'){
        const openId=localStorage.getItem('openId')
        const newParams={...fieldsValue,openId};
        dispatch({
          type: 'login/forgot',
          payload: newParams
        }).then(res => {
          if (res.data && res.data.status === 1) {
            Toast.success('修改成功,请重新登录', 1, () => {
              dispatch(
                routerRedux.push(
                  {
                    pathname: `/`,
                  },
                )
              );
            });

          } else {
            Toast.fail(res.data.message, 1);
          }
        })
      }

    })

  }

  waitOneMinute = (timer, time, loading) => {
    /*
      timer: string,需要再class的this声明, 保存定时器, 用于组件销毁之前清除定时器
      time: string,需要再state中声明,用于显示倒计时
      loading: string,需要再state中声明, 用于控制按钮loading
    */
    let sec = 59;
    this.setState({
      [loading]: true,
      [time]: sec
    })
    this[timer] = setInterval(() => {
      if (sec > 0) {
        this.setState({
          [time]: sec -= 1
        })
      } else {
        clearInterval(this[timer])
        this.setState({
          [loading]: false
        })
      }
    }, 1000)
  }

  sendMessage = () => {
    const {form, dispatch} = this.props;
    const {validateFields} = form;
    validateFields(['phone'], (err, val) => {
      if (!err) {
        // 发送短信
        dispatch({
          type: 'login/getVerify',
          payload: {
            phone: val.phone
          }
        })
        this.waitOneMinute('timer', 'time', 'loading');
      }
    })
  }

  render() {
    const {loading, time} = this.state;
    const {history, form} = this.props;
    const {getFieldProps, getFieldError} = form;
    let errors = null;

    return (

      <div className={'container'}>
        <NavBar
          mode="light"
          icon={<Icon type="left"/>}
          onLeftClick={() => history.back()}
        >重置密码</NavBar>
        <Helmet>
          <meta charSet="utf-8" />
          <title>找回密码-小皮球触屏版</title>
        </Helmet>

        <Card className={'containInner222'}>
          <InputItem
            {...getFieldProps('phone', {
              rules: [{
                required: true, message: '请输入手机号码'
              }, {
                min: 11, message: '手机号不足11位'
              }, {
                max: 11, message: '手机号超过11位'
              }
              ]
            })
            }
            type="number"
            // style={{border: '1px solid rgba(0,0,0,.2)', padding: '8px'}}
            placeholder="请输入手机号码"
          />
          <span style={{color: 'red'}}>{(errors = getFieldError('phone')) ? errors.join(',') : null}</span>
          <div className={'messageBox'}>
            <div className={'message'}>
              <InputItem
                {...getFieldProps('phonecode', {
                  rules: [{
                    required: true, message: '请输入验证码', trigger: 'onBlur'
                  }],
                })}
                // style={{border: '1px solid rgba(0,0,0,.2)', padding: '8px', width: '50vw', marginRight: '4vw'}}
                placeholder="请输入验证码"
              />
              <Button
                type='primary'
                style={{width: '40%', height: '38px', lineHeight: '38px', fontSize: '14px', borderRadius: '35px'}}
                size='small'
                onClick={() => this.sendMessage()}
                loading={loading}
                disabled={loading}
              >
                {loading ? `${time} 秒` : '获取验证码'}
              </Button>
            </div>
            <span style={{color: 'red'}}>{(errors = getFieldError('phonecode')) ? errors.join(',') : null}</span>
          </div>
          <InputItem
            {...getFieldProps('password', {
              rules: [{
                required: true, message: '请输入6~16位的密码'
              }, {
                min: 6, message: '密码不足6位'
              }, {
                max: 16, message: '密码超过16位'
              }
              ]
            })
            }
            type="password"
            // style={{border: '1px solid rgba(0,0,0,.2)', padding: '8px'}}
            placeholder="请输入6~16位的密码"
          />
          <span style={{color: 'red'}}>{(errors = getFieldError('password')) ? errors.join(',') : null}</span>

        </Card>

        <Button
          className={'reset'}
          type='primary'
          style={{borderRadius: '50px'}}
          onClick={() => this.handleReset()}
        >
          确定
        </Button>

       {/* <div className={'downloadBtn'}>
          <Button type="primary">下载小皮球APP</Button>
        </div>*/}
          <HookFooter/>
      </div>
    );
  }
}

Forgot.propTypes = {};

export default Forgot;
