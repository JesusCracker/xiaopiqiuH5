import React, {PureComponent} from "react";
import {Card, InputItem, Button, Toast, Flex, Checkbox} from 'antd-mobile';
import {createForm} from 'rc-form';
import register from '../assets/register.png'
import '../components/Register.less'
import {routerRedux} from "dva/router";
import queryString from "query-string";
import {Helmet} from 'react-helmet';

const AgreeItem = Checkbox.AgreeItem;

class Register extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      time: 59,
      loading: false,
      isAgree: false,
    };

  }

  timer = null;
  handleLogin = e => {
    // e.preventDefault();
    const {location, history, form, dispatch} = this.props;
    const {validateFields} = form;
    validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      // console.dir(fieldsValue)
      if (typeof localStorage !== 'undefined') {
        const openId = localStorage.getItem('openId');
        const newParams = {...fieldsValue, openId};
        dispatch({
          type: 'login/register',
          payload: newParams
        }).then(res => {
          if (res.data && res.data.status === 1) {
            Toast.success('注册成功,即将跳到我的积分', 1, () => {
              dispatch(
                routerRedux.push(
                  {
                    pathname: `/myScore?`,
                    search: queryString.stringify({
                      goldCoin: res.data.data.goldCoin,

                    })
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
        //发送短信前的判断
        dispatch({
          type: 'login/isRegistered',
          payload: {
            phone: val.phone
          }
        }).then(res => {
          console.dir(res);
          if (res && res.data.status === 1) {
            if (!('data' in res.data)) {
              // 发送短信
              dispatch({
                type: 'login/getVerify',
                payload: {
                  phone: val.phone
                }
              })
              this.waitOneMinute('timer', 'time', 'loading');

            } else {
              Toast.fail('您已注册，请勿重复注册', 2);
            }
          }
        })


      }
    })
  }

  setAgree = (checked) => {
    this.setState({
      isAgree: checked,
    })

  }
  handleTo = () => {
    const {history, location} = this.props;
    history.push(`/register/protocol`)
  }

  goSB = () => {
    const {history, location} = this.props;
    history.push(`/register/privacy`)
  }

  render() {
    const {getFieldProps, getFieldError} = this.props.form;
    const {loading, time, isAgree} = this.state;

    let errors = '';
    return (
      <div className={'container2'}>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>马上注册抢红包-小皮球触屏版</title>
        </Helmet>

        <img src={register} alt="" className={'bg-image'}/>
        <Card className={'containInner2'}>
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
            placeholder="输入手机号立即抢红包"
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
          <Button
            type='primary'
            style={{borderRadius: '50px', marginTop: '20px'}}
            onClick={() => this.handleLogin()}
            disabled={!isAgree}
          >
            注册并登录
          </Button>

          <Flex className={'agree'}>
            <Flex.Item>
              <AgreeItem data-seed="logId" onChange={e => this.setAgree(e.target.checked)}>
                同意并接受 <a className={'protocol'} onClick={(e) => this.handleTo()}>《用户服务协议》</a>和<a className={'protocol'}
                                                                                                 onClick={() => this.goSB()}>《隐私权政策》</a>
              </AgreeItem>
            </Flex.Item>
          </Flex>
        </Card>
      {/*  <div className={'downloadBtn'}>
          <Button type="primary">下载小皮球APP</Button>
        </div>*/}
      </div>
    );
  }
}

Register.propTypes = {};

export default createForm()(Register);
