import React, {Component} from 'react';
import {Card, Button, Toast, Flex, NavBar, Icon} from 'antd-mobile';
import queryString from 'query-string'
import {connect} from "dva";
import {filePath} from '../global';
import './MyScore.less'

import 积分图片 from '../assets/h5-我的积分-图片.png';
import HookFooter from "./SB";
import {routerRedux} from "dva/router";

@connect(({download, loading}) => ({
    download,
}))

class MyScore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score: null
        };
    }


    componentDidMount() {
        const {location, dispatch, history} = this.props;
        const params = queryString.parse(location.search);
        if (params && 'goldCoin' in params) {
            this.setState({
                score: params.goldCoin,
            })
        }
        if (window.history && window.history.pushState) {
            window.onpopstate = function () {
                window.history.pushState('forward', null, '');
                window.history.forward(1);
            };
        }
        window.history.pushState('forward', null, '');//在IE中必须得有这两行
        window.history.forward(1);
    }

    handleDownload() {
        const {dispatch} = this.props;
        dispatch({
            type: 'download/app',
            payload: {
                page: 1,
                limit: 10,
            },
        }).then(res => {

            if (res.data && res.data.status === 1) {
                if (res.data && res.data.data.length === 0) {
                    Toast.fail('当前没有apk文件', 1);
                    return false;
                } else {
                    Toast.loading('准备下载...', 1, () => {
                        const path=filePath+res.data.data[0].apkSrc
                        const form = document.createElement('form');
                        form.action = path;
                        document.getElementsByTagName('body')[0].appendChild(form);
                        form.submit();

                    });
                }
            } else {
                Toast.fail(res.data.message, 1);
            }
        });
    }

    handleOpen() {
    }

    render() {
        const {history} = this.props;
        const {score} = this.state;
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
                <div className={'opBtn'}>
                    <Button
                        className={'openAPPs'}
                        type='primary'
                        style={{borderRadius: '50px'}}
                        onClick={() => this.handleOpen()}
                    >
                        打开小皮球APP
                    </Button>
                    <Button
                        className={'downloads'}
                        type='primary'
                        style={{borderRadius: '50px'}}
                        onClick={() => this.handleDownload()}
                    >
                        下载小皮球APP
                    </Button>
                </div>

                <HookFooter/>
            </div>
        );
    }
}

MyScore.propTypes = {};


export default MyScore;
