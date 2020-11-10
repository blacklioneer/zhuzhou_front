import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Card,
  Form,
  Row,
  Col,
  Icon,
  Tabs,
  message,
  Badge,
  Divider,
} from 'antd';
import ShowTable from '@/components/ShowTable';
import styles from './Overview.less';
import { DarkBar,MultiPieVertical } from '@/components/Charts';
// const statusMap = ['default', 'processing', 'success', 'error'];
// const status = ['关闭', '运行中', '已上线', '异常'];

const status = ['系统预警', '机床提示', '机床暂停','机床报警', '机床急停', '人员录入'];
const style = [styles.statustextthirdery_pause,styles.statustextthirdery_pause,styles.statustextthirdery_pause,styles.statustextthirdery_error,styles.statustextthirdery_error,styles.statustextthirdery_pause];
const { TabPane } = Tabs;


@Form.create()
class UnusualStatus extends PureComponent {
  columns = [
    {
      title: '设备号',
      dataIndex: 'name',
      width:60,
      fixed: 'left',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '异常时间',
      width:150,
      dataIndex: 'unusualtime',
    },
    {
      title: '异常种类',
      dataIndex: 'etype',
      width:80,
      render: text => <span className={style[text]}>{status[text]}</span>
    },
    {
      title: '异常描述',
      dataIndex: 'unusualdesc',
      width:200,
    },
    {
      title: '处理措施',
      dataIndex: 'solution',
      width:300,
    },
  ];


  /* handleStandardTableChange = (pagination, filtersArg, sorter) => {
     const { dispatch } = this.props;
     const { formValues } = this.state;

     const filters = Object.keys(filtersArg).reduce((obj, key) => {
       const newObj = { ...obj };
       newObj[key] = getValue(filtersArg[key]);
       return newObj;
     }, {});

     const params = {
       currentPage: pagination.current,
       pageSize: pagination.pageSize,
       ...formValues,
       ...filters,
     };
     if (sorter.field) {
       params.sorter = `${sorter.field}_${sorter.order}`;
     }

     dispatch({
       type: 'rule/fetch',
       payload: params,
     });
   };
 */
  previewItem = id => {
    router.push(`/equipment/${id}`);
  };




  render() {
 const {Tabledata,chartdata,Bardata,handleTabChange, activeKey, onChange}=this.props;
    return (
      <Card
        title={<span className={styles.textprimarycolor}>生产线异常信息</span>}
        className={styles.maincard}
        bordered={false}
      >
        <Row gutter={12}>
          <Col span={18}>
            <ShowTable
              data={Tabledata}
              columns={this.columns}
              onChange={onChange}
              scroll={{ x: 700, y: 255 }}
            />
          </Col>
          <Col span={6}>
            <Row gutter={8}>
              <Tabs activeKey={activeKey} onChange={handleTabChange}>
                <TabPane tab={<span className={styles.textseconderycolor}>日</span>} key='day'>
                  <div style={{padding:'0 0 20px 0'}}>
                    <Card
                      bodyStyle={{padding:'0'}}
                      className={styles.seconderycard}
                      bordered={false}
                      title={<span className={styles.textseconderycolor}>日设备异常种类统计</span>}
                    >
                      <MultiPieVertical
                        data={chartdata}
                        height={206}
                      />
                    </Card>
                  </div>
                </TabPane>
                <TabPane tab={<span className={styles.textseconderycolor}>周</span>} key='week'>
                  <div style={{padding:'0 0 20px 0'}}>
                    <Card
                      bodyStyle={{padding:'0'}}
                      className={styles.seconderycard}
                      bordered={false}
                      title={<span className={styles.textseconderycolor}>周设备异常次数统计</span>}
                    >
                      <div>
                        <DarkBar
                          padding={[12,12,48,20]}
                          data={Bardata}
                          height={206}
                        />
                      </div>
                    </Card>
                  </div>
                </TabPane>
              </Tabs>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default UnusualStatus;
