function AudioPlay(obj) {
  this.myAudio = new Audio();
  // 是否播放
  this.isStart = false;
  // 是否静音
  this.isMuted = false;
  // 音频地址
  // 播放按钮元素
  // this.buttonEl = document.querySelector(obj.buttonSelector);
  this.palyButtonEl = obj.palyButtonEl;
  // 音量控件元素
  this.volumeEl = obj.volumeEl;
  // 静音控制
  this.mutedButtonEl = obj.mutedButtonEl;
  this.myAudio.src = obj.songUrl;
  // 初始化
  this.init();
}

AudioPlay.prototype = {
  /**
   * 改变音量事件
   *
   */
  changeVolumnEvent() {
    this.volumeEl.addEventListener('change', (event) => {
      this.myAudio.volume = event.target.value / 100;
    });
  },
  /**
   * 暂停和播放事件
   *
   */
  playButtonClickEvent() {
    this.palyButtonEl.addEventListener('click', (event) => {
      this.isStart = !this.isStart;
      // 停止播放
      if (this.isStart) {
        // eslint-disable-next-line no-param-reassign
        event.target.innerText = 'START';
        this.palyButtonEl.setAttribute('data-loaded', true);
        this.myAudio.play();
        // 开始播放
      } else {
        // eslint-disable-next-line no-param-reassign
        event.target.innerText = 'STOP';
        this.palyButtonEl.setAttribute('data-loaded', false);
        this.myAudio.pause();
      }
    });
  },
  /**
   * 静音和播放
   *
   */
  mutedButtonClickEvent() {
    this.mutedButtonEl.addEventListener('click', (event) => {
      this.isMuted = !this.isMuted;
      // 停止播放
      if (this.isMuted) {
        // eslint-disable-next-line no-param-reassign
        event.target.innerText = '静音';
        this.mutedButtonEl.setAttribute('data-loaded', true);
        this.myAudio.muted = true;
        // 开始播放
      } else {
        // eslint-disable-next-line no-param-reassign
        event.target.innerText = '不静音';
        this.mutedButtonEl.setAttribute('data-loaded', false);
        this.myAudio.muted = false;
      }
    });
  },
  /**
   * 初始化
   *
   */
  init() {
    this.changeVolumnEvent();
    this.playButtonClickEvent();
    this.mutedButtonClickEvent();
    this.palyButtonEl.setAttribute('data-loaded', false);
    this.myAudio.volume = 1;
    this.myAudio.autoplay = false;
  },
};

export default AudioPlay;
