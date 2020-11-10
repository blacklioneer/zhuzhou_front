import React, { Component, Suspense,} from 'react';
import { Row, Col, Card,Icon} from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Equipment1.less';


const ScheduleProgress = React.lazy(() => import('./ScheduleProgress'));
const Transmission=React.lazy(()=> import('./Transmission'));
const  OEE=React.lazy(()=> import('./OEE'));
const RunStatus=React.lazy(()=> import('./RunStatus'));
const UnusualInfo=React.lazy(()=> import('./UnusualInfo'));
const ForeseeableWarning=React.lazy(()=> import('./ForeseeableWarning'));
const LineChart = React.lazy(() => import('./LineChart'));
const Maintenance = React.lazy(()=> import('./Maintenance'));
const ShowTime = React.lazy(()=> import('./ShowTime'));

const colfirst={
  xs: 24,
  sm: 24,
  md: 24,
  lg: 6,
  xl: 6,
};
const colsecond={
  xs: 24,
  sm: 24,
  md: 24,
  lg: 12,
  xl: 12,
};
const Tabs =['temperature','load','override','consumption'];


const icon =[
  <Icon type="play-circle" theme="filled" style={{ fontSize: '80px', color: 'green' }} />,
  <Icon type="pause-circle" theme="filled" style={{ fontSize: '80px', color: 'rgb(238,201,0)' }} />,
  <Icon type="exclamation-circle" theme="filled" style={{ fontSize: '80px', color: 'red' }} />,
  <Icon type="close-circle" theme="filled" style={{ fontSize: '80px', color: 'gray' }} />,
];


@connect(({ equipmentdata, loading }) => ({
  equipmentdata,
  loadingdata: loading.effects['equipmentdata/fetch'],
}))
class Equipment1 extends Component{
  state = {
    currentTabKey: 'temperature',
  };

  componentWillMount() {
    const { dispatch } = this.props;
    const params = {
      id: 1,
    };
    dispatch({
      type: 'equipmentdata/fetchseconddata',
      payload: params,
    });
    dispatch({
      type: 'equipmentdata/fetchminitedata',
      payload: params,

    });
    dispatch({
      type: 'equipmentdata/fetchtabledata',
      payload: params,
    });
    this.timer1 = setInterval(() => {
      dispatch({
        type: 'equipmentdata/fetchseconddata',
        payload: params,
      });
    },2000 );
    this.timer2 = setInterval(() => {
      dispatch({
        type: 'equipmentdata/fetchminitedata',
        payload: params,
      });
    },60000 );
    this.timer3 = setInterval(() => {
      dispatch({
        type: 'equipmentdata/fetchtabledata',
        payload: params,
      });
    },60000 );
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    clearInterval(this.timer1);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
    dispatch({
      type: 'equipmentdata/clear',
    });

  }

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handelClickChange = () => {
    router.push('/overview1')
  };

  handleUnusualTableChange = (pagination) => {
    const { dispatch } = this.props;
    const params = {
      currentPage: pagination.current,
      id: 1,
    };
    dispatch({
      type: 'equipmentdata/fetchtabledata',
      payload: params,
    });
  };


  render(){
    const{equipmentdata} = this.props;
    const {oeedata,
      esstatus,
      order,
      transition,
      unusualdata,
      warning,
      runstatus,
      temp,
      viberation,
      load,
      consumption } = equipmentdata;
    const {currentTabKey} = this.state;
    return (
      <GridContent>
        <Card
          className={styles.maincard}
          title={
            <Row>
              <Col span={10}>
                <span>
                  <p
                    className={styles.headprimarycolor}
                    onClick={this.handelClickChange}
                  >
                    KD-36
                  </p>
                  <p className={styles.headsecondrycolor}>大规格五轴工具磨床</p>
                </span>
              </Col>
              <Col span={6}>
                <Suspense fallback={null}>
                  <ShowTime />
                </Suspense>
              </Col>
            </Row>
          }
          extra={icon[runstatus]}
        >
          <Row gutter={24}>
            <Col {...colfirst}>
              <Suspense fallback={null}>
                <ScheduleProgress
                  order={order}
                />
              </Suspense>
            </Col>
            <Col {...colfirst}>
              <Suspense fallback={null}>
                <Transmission
                  transition={transition}
                />
              </Suspense>
            </Col>
            <Col {...colfirst}>
              <Suspense fallback={null}>
                <OEE
                  oeedata={oeedata}
                />
              </Suspense>
            </Col>
            <Col {...colfirst}>
              <Suspense fallback={null}>
                <RunStatus
                  esstatus={esstatus}
                />
              </Suspense>
            </Col>
          </Row>
          <Row gutter={24} style={{paddingTop:'24px'}}>
     {/*       <Col {...colsecond}>
              <Suspense fallback={null}>
                <Maintenance
                  maintain={maintain}
                />
              </Suspense>
            </Col> */}
            <Col {...colsecond}>
              <Suspense fallback={null}>
                <ForeseeableWarning
                  warning={warning}
                />
              </Suspense>
              <Row style={{paddingTop:'24px'}} gutter={24}>
                <Suspense fallback={null}>
                  <LineChart
                    activeKey={currentTabKey}
                    handleTabChange={this.handleTabChange}
                    temperaturedata={temp}
                    loaddata={load}
                    energyconsumptiondata={consumption}
                    vibrationdata={viberation}
                  />
                </Suspense>
              </Row>
            </Col>
            <Col {...colsecond}>
              <Suspense fallback={null}>
                <UnusualInfo
                  data={unusualdata}
                  onChange={this.handleUnusualTableChange}
                />
              </Suspense>
            </Col>
          </Row>
        </Card>
      </GridContent>
    );
  }
}
export default props => (
  <AsyncLoadBizCharts>
    <Equipment1 {...props} />
  </AsyncLoadBizCharts>
);
