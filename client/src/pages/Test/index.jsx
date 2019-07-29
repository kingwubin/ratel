import React, { Component, createRef } from 'react';
import { notification } from 'antd';
import AudioPlay from './audioPlay';
import style from './audioStyle.less';
// 音頻地址
import SONG from './1870.mp3';

const openNotification = () => {
  notification.open({
    message: '报警信息',
    description: (
      <div>
        <div className={style.contain}>网络信息出错</div>
        <div className={style.time}>时间:2019年7月5日5：30</div>
      </div>),
    onClick: () => {
      console.log('Notification Clicked!');
    },
    duration: 3,
  });
};

// 单项
class APlay extends Component {
  constructor() {
    super();
    this.play = createRef();
    this.muted = createRef();
    this.volume = createRef();
  }

  componentDidMount() {
    // eslint-disable-next-line no-new
    new AudioPlay({
      palyButtonEl: this.play.current,
      mutedButtonEl: this.muted.current,
      volumeEl: this.volume.current,
      songUrl: SONG,
    });
  }

  render() {
    return (
      <div className={style.audio}>
        {/* eslint-disable-next-line max-len */}
        { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */ }
        <div className={style.pause} ref={this.play} onClick={openNotification}>STOP</div>
        <div className={style.muted} ref={this.muted}>静音</div>
        <p>
          音量：
          <input ref={this.volume} type="range" name="" min="0" max="100" />
        </p>
      </div>
    );
  }
}

export default APlay;
