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
  message,
  Badge,
  Divider,
} from 'antd';
import ShowTable from '@/components/ShowTable';
import styles from './Overview.less';
import { DarkBar,MultiPieVertical } from '@/components/Charts';
// const statusMap = ['default', 'processing', 'success', 'error'];
// const status = ['关闭', '运行中', '已上线', '异常'];



@Form.create()
class UnusualStatus extends PureComponent {
  columns = [
    {
      title: '设备号',
      dataIndex: 'name',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '异常时间',
      dataIndex: 'unusualtime',
    },
    {
      title: '异常描述',
      dataIndex: 'unusualdesc',
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
    router.push(`/profile/basic/${id}`);
  };



  render() {
 const {Tabledata,chartdata,Bardata,onChange}=this.props;
    return (
      <Card
        title={<span className={styles.textprimarycolor}>生产线异常信息</span>}
        className={styles.maincard}
        bordered={false}
      >
        <Row gutter={12}>
          <Col span={12}>
            <ShowTable
              data={Tabledata}
              columns={this.columns}
              onChange={onChange}
            />
          </Col>
          <Col span={12}>
            <Row gutter={8}>
              <Col span={12}>
                <div style={{padding:'34.5px 0'}}>
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
              </Col>
              <Col span={12}>
                <div style={{padding:'34.5px 0'}}>
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
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default UnusualStatus;
