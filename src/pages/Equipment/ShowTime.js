import React, { Component } from 'react';
import { Card } from 'antd';
import moment from 'moment';
import styles from './Equipment1.less';


// function fixedZero(val) {
//   return val * 1 < 10 ? `0${val}` : val;
// }
// const initTime = props => {
//   let lastTime = 0;
//   let targetTime = 0;
//   try {
//     if (Object.prototype.toString.call(props.target) === '[object Date]') {
//       targetTime = props.target.getTime();
//     } else {
//       targetTime = new Date(props.target).getTime();
//     }
//   } catch (e) {
//     throw new Error('invalid target prop', e);
//   }
//
//   lastTime = targetTime - new Date().getTime();
//   return {
//     lastTime: lastTime < 0 ? 0 : lastTime,
//   };
// };

class ShowTime extends Component {
  timer = 0;

  interval = 1000;

  constructor(props) {
    super(props);
    // const { lastTime } = initTime(props);
    this.state = {
      day:'',
      week:'',
      year:'',
    };
  }

  // static getDerivedStateFromProps(nextProps, preState) {
  //   const { lastTime } = initTime(nextProps);
  //   if (preState.lastTime !== lastTime) {
  //     return {
  //       lastTime,
  //     };
  //   }
  //   return null;
  // }

  componentDidMount() {
    this.tick();
  }

  // componentDidUpdate(prevProps) {
  //   const { target } = this.props;
  //   if (target !== prevProps.target) {
  //     clearTimeout(this.timer);
  //     this.tick();
  //   }
  // }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // defaultFormat = time => (
  //  <span>{moment(time).format('hh:mm:ss')}</span>
  // );
  // defaultFormat = time => {
  //   const hours = 60 * 60 * 1000;
  //   const minutes = 60 * 1000;
  //
  //   const h = Math.floor(time / hours);
  //   const m = Math.floor((time - h * hours) / minutes);
  //   const s = Math.floor((time - h * hours - m * minutes) / 1000);
  //   return (
  //     <span>
  //       {fixedZero(h)}:{fixedZero(m)}:{fixedZero(s)}
  //     </span>
  //   );
  // };

  tick = () => {
    this.timer = setInterval(() => {
      const nowtime=new Date().getTime();
      this.setState(
        {
          year:moment(nowtime).format('YYYY年MM月DD日'),
          week:moment(nowtime).format('第w周'),
          day:moment(nowtime).format('HH:mm'),
        },
      );
    }, this.interval);
  };

  render() {
    const { day,week,year } = this.state;
    return (
      <Card
        className={styles.intendmiddle}
      >
        <p className={styles.runstatus}>{year}</p>
        <p className={styles.runstatus}>{week}</p>
        <p className={styles.runstatus}>{day}</p>
      </Card>
    )
  }
}

export default ShowTime;
