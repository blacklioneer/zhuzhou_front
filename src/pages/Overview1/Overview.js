import React,{ Component, Suspense }  from 'react';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { Row, Col} from 'antd';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';
import { connect } from 'dva';

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 6,
  xl: 6,
};
const topColMiddleProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 12,
  xl: 12,
};
const ProductSchedule = React.lazy(() => import('./ProductSchedule'));
const ProductTable = React.lazy(() => import('./ProductTable'));
const TransitionTable = React.lazy(() => import('./TransitionTable'));
const EquipmentStatus = React.lazy(() => import('./EquipmentStatus'));
const UnusualStatus = React.lazy(() => import('./UnusualStatus'));
const ManHourLost = React.lazy(() => import('./ManHourLost'));
const Quality = React.lazy(() => import('./Quality'));
const ProductLayout = React.lazy(() => import('./ProductLayout'));
@connect(({ overview,productionlayout }) => ({
  overview,
  productionlayout,
}))
class Overview extends Component{
  componentDidMount() {
    const { dispatch } = this.props;
    // this.reqRef = requestAnimationFrame(() => {
    dispatch({
      type: 'overview/fetchschedule',
    });
    dispatch({
      type: 'overview/fetchproducttable',
    });
    dispatch({
      type: 'overview/fetchtransitiontable',
    });
    dispatch({
      type: 'overview/fetchunusualstatustable',
    });
    dispatch({
      type: 'overview/unusualstatusdata',
    });
    dispatch({
      type: 'overview/oeedata',
    });
    dispatch({
      type: 'overview/qualifieddata',
    });
    dispatch({
      type: 'overview/equipmentstatusdata',
    });
    dispatch({
      type: 'productionlayout/fetch',
    });
    this.timer1 = setInterval(() => {
      dispatch({
        type: 'overview/fetchschedule',
      });
    },60000 );
    this.timer2 = setInterval(() => {
      dispatch({
        type: 'overview/fetchproducttable',
      });
    },60000 );
    this.timer3 = setInterval(() => {
      dispatch({
        type: 'overview/fetchtransitiontable',
      });
    },60000 );
    this.timer4 = setInterval(() => {
      dispatch({
        type: 'overview/fetchunusualstatustable',
      });
    },60000 );
    this.timer5 = setInterval(() => {
      dispatch({
        type: 'overview/unusualstatusdata',
      });
    },60000 );
    this.timer6 = setInterval(() => {
      dispatch({
        type: 'overview/oeedata',
      });
    },60000 );
    this.timer7 = setInterval(() => {
      dispatch({
        type: 'overview/qualifieddata',
      });
    },60000 );
    this.timer8 = setInterval(() => {
      dispatch({
        type: 'overview/equipmentstatusdata',
      });
    },60000 );
    this.timer9 = setInterval(() => {
      dispatch({
        type: 'productionlayout/fetch',
      });
    },30000 );
    // });
  }

  componentWillUnmount() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
    clearInterval(this.timer4);
    clearInterval(this.timer5);
    clearInterval(this.timer6);
    clearInterval(this.timer7);
    clearInterval(this.timer8);
    clearInterval(this.timer9);
    const { dispatch } = this.props;
    dispatch({
      type: 'overview/clear',
    });
    dispatch({
      type: 'productionlayout/clear',
    });
    // cancelAnimationFrame(this.reqRef);
  }

  handleProductTableChange = (pagination) => {
    const { dispatch } = this.props;

    const params = {
      currentPage: pagination.current,
    };
    dispatch({
      type: 'overview/fetchproducttable',
      payload: params,
    });
  };

  handleTransitionTableChange = (pagination) => {
    const { dispatch } = this.props;

    const params = {
      currentPage: pagination.current,
    };
    dispatch({
      type: 'overview/fetchtransitiontable',
      payload: params,
    });
  };

  handleUnusualTableChange = (pagination) => {
    const { dispatch } = this.props;

    const params = {
      currentPage: pagination.current,
    };
    dispatch({
      type: 'overview/fetchunusualstatustable',
      payload: params,
    });
  };


  render(){
    const {overview,productionlayout}=this.props;
    const {
      ds,
      ws,
      es,
      productdata,
      daliysdata,
      weeklysdata,
      transitiondata,
      unusualtabledata,
      unusualchartdata,
      unusualbardata,
      oeedaliydata,
      oeeweeklydata,
      daliyqualifieddata,
      weeklyqualifieddata,
      esstatus,
    } = overview;
    const {layoutdata}=productionlayout;
    return (
      <GridContent>
        <Row gutter={12}>
          <Col {...topColResponsiveProps}>
            <Suspense fallback={null}>
              <ProductSchedule
                ds={ds}
                ws={ws}
                daliydata={daliysdata}
                weeklydata={weeklysdata}
              />
            </Suspense>
            <Suspense fallback={null}>
              <ProductTable
                data={productdata}
                onChange={this.handleProductTableChange}
              />
            </Suspense>
          </Col>
          <Col {...topColMiddleProps}>
            <Suspense fallback={null}>
              <ProductLayout
                data={layoutdata}
              />
            </Suspense>
          </Col>
          <Col {...topColResponsiveProps}>
            <Suspense fallback={null}>
              <ManHourLost
                daliydata={oeedaliydata}
                weeklydata={oeeweeklydata}
              />
            </Suspense>
            <Suspense fallback={null}>
              <Quality
                daliyqualified={daliyqualifieddata}
                weeklyqualified={weeklyqualifieddata}
              />
            </Suspense>
          </Col>
        </Row>
        <Row gutter={12} style={{marginTop:'18px'}}>
          <Col {...topColResponsiveProps}>
            <Suspense fallback={null}>
              <TransitionTable
                data={transitiondata}
                onChange={this.handleTransitionTableChange}
              />
            </Suspense>
          </Col>
          <Col {...topColMiddleProps}>
            <Suspense fallback={null}>
              <UnusualStatus
                Tabledata={unusualtabledata}
                chartdata={unusualchartdata}
                Bardata={unusualbardata}
                onChange={this.handleUnusualTableChange}
              />
            </Suspense>
          </Col>
          <Col {...topColResponsiveProps}>
            <Suspense fallback={null}>
              <EquipmentStatus
                es={es}
                chartdata={esstatus}
              />
            </Suspense>
          </Col>
        </Row>

      </GridContent>
    );
  }
}
export default props => (
  <AsyncLoadBizCharts>
    <Overview {...props} />
  </AsyncLoadBizCharts>
);
