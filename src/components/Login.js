import React, {PureComponent} from 'react';
import {InputItem, Toast, Button, Flex} from 'antd-mobile';
import {routerRedux} from 'dva/router';
import {createForm} from 'rc-form';
import {getUrlParams} from "../utils/common";
import queryString from 'query-string'
import HookFooter from "./SB";

import './Login.less'


import loginLogin from '../assets/login-logo.png';

@createForm()

class Login extends PureComponent {
  constructor(props) {
    super(props);


    this.state = {
      hasError: false,
      value: '',
    };
  }

  UNSAFE_componentWillMount() {
    // console.log('componentWillMount');
  }

  componentDidMount() {
/*    const {dispatch} = this.props;
    const code = getUrlParams('?code', this.props.location.search);
    if (!code) {
      // Toast.fail('获取code失败');
      return false;
    } else {
      //通过code获取个人信息
      dispatch({
        type: 'login/saveUserInfo',
        payload: code
      }).then(res => {
        if (res && res.data.status === 1) {
            dispatch({
                type: 'login/save',
                payload: {'requested':true},
            })
          const result = res.data.data;
          // Toast.success(JSON.stringify(result), 30, null, false);
          if (result && "phone" in result && result.openId) {
            dispatch(
              routerRedux.push(
                {
                  pathname: `/myScore?`,
                  search: queryString.stringify({
                    goldCoin: result.goldCoin,

                  })
                },
              )
            );
          } else {
            // Toast.info(JSON.stringify('we got openID:' + result.openId), 3, null, false);

            if (typeof localStorage !== 'undefined' && result.openId && result.openId !== '') {
              localStorage.setItem('openId', result.openId);
            } else {
              // Toast.fail('获取openId为空', 3)
            }
          }
        } else {
          Toast.fail('登录失败', 1);
        }
      })

    }*/

  }

  handleLogin = () => {
    const {location, history, form, dispatch} = this.props;
    const {validateFields} = form;
    const openId = localStorage.getItem('openId');
    validateFields((err, val) => {
      if (err) return;
      if (val) {
        const newParams = {...val, openId}
        dispatch({
          type: 'login/loginByAccount',
          payload: newParams
        }).then(res => {
          if (res.data && res.data.status === 1) {
            Toast.success('登录成功', 1, () => {
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

  render() {
    const {dispatch, form} = this.props;
    const {getFieldProps, getFieldError} = form;
    let errors = null;

    return (
      <div className={'container'}>
        <div className={'blockArea'}>
          <img src={loginLogin} alt="" className={'logo'}/>
          <div className={'title'}>欢迎来到小皮球平台</div>
        </div>
        <div className={'innerArea'}>
          <div className={'userName'}>
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
              placeholder="输入手机号码"
              // error={this.state.hasError}
              // onErrorClick={this.onErrorClick}
              // onChange={this.onChange}
              // value={this.state.value}
            >
              <div className={'phoneIcon'}/>
            </InputItem>
            <span style={{color: 'red'}}>{(errors = getFieldError('phone')) ? errors.join(',') : null}</span>
          </div>
          <div className={'passWord'}>
            <InputItem
              {...getFieldProps('password', {
                rules: [{
                  required: true, message: '请输入密码'
                }],
              })}
              type="password"
              placeholder="输入密码"
              autoComplete={'false'}
            >
              <div className={'pwdIcon'}/>
            </InputItem>
            <span style={{color: 'red'}}>{(errors = getFieldError('password')) ? errors.join(',') : null}</span>
          </div>
        </div>

        <div className={'submit'}>
          <Button
            onClick={() => this.handleLogin()}
          >登录</Button>
        </div>
        <div className={'footer'}>
          <Flex>
            <Flex.Item>还没有账号？<span className={'register'} onClick={() => {
              dispatch(
                routerRedux.push(
                  {
                    pathname: `/register`,

                  },
                )
              );
            }}>注册</span></Flex.Item>
            <Flex.Item className={'forget'} onClick={() => {
              dispatch(
                routerRedux.push(
                  {
                    pathname: `/forgot`,
                  },
                )
              );
            }}>忘记密码</Flex.Item>
          </Flex>
        </div>

          <HookFooter/>

      {/*  <div className={'downloadBtn'}>
          <Button type="primary">下载小皮球APP</Button>
        </div>*/}
          {/*<div className={'inn'}>小皮球Copyright © 2020-2021 <div className={'line'}>四川小皮球科技有限公司 | 蜀ICP备20021491号</div></div>*/}
      </div>

    );
  }
}

Login.propTypes = {};

export default Login;
