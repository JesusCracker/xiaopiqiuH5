import React from 'react';
import {connect} from 'dva';
import Login from "../components/Login";
import {Toast} from 'antd-mobile';
import {getUrlParams} from "../utils/common";
import {routerRedux} from "dva/router";
import queryString from "query-string";

const LoginPage = (props) => {

    const {dispatch} = props;
    const code = getUrlParams('?code', props.location.search);
    if (!code) {
        // Toast.fail('获取code失败');
        return <Login {...props}/>
    } else {
        //通过code获取个人信息
        dispatch({
            type: 'login/saveUserInfo',
            payload: code
        }).then(res => {
            if (res && res.data.status === 1) {
                const result = res.data.data;
                // Toast.success(JSON.stringify(result && "phone" in result && result.openId), 30, null, false);
                if (result) {
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
                    return  false;
                } else {

                    // Toast.info(JSON.stringify('we got openID:' + result.openId), 3, null, false);

                    if (typeof localStorage !== 'undefined' && result.openId && result.openId !== '') {
                        localStorage.setItem('openId', result.openId);
                    } else {
                        return <Login {...props}/>
                        // Toast.fail('获取openId为空', 3)
                    }
                    return <Login {...props}/>
                }
            } else {
                // Toast.fail('登录失败', 1);
            }
        })
        return ''
        // return <Login {...props}/>
    }

}


LoginPage.propTypes = {};

const mapStateToProps = (state, loading) => {
    return {
        userInfo: state.login.userInfo,
        loading
    }
}


export default connect(mapStateToProps)(LoginPage);
