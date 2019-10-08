import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import {
  Card,
  Form,
} from 'antd';
import ShowTable from '@/components/ShowTable';
import styles from './Equipment1.less';
// import { DarkBar,MultiPieVertical } from '@/components/Charts';
// const statusMap = ['default', 'processing', 'success', 'error'];
 const status = ['未解决', '已解决','未解决'];
const style = [styles.statustextthirdery_error,styles.statustextthirdery_run,styles.statustextthirdery_pause];


@Form.create()
class UnusualInfo extends PureComponent {
  columns = [
    {
      title: '异常编号',
      dataIndex: 'name',
      // render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '异常时间',
      dataIndex: 'unusualtime',
    },
    {
      title: '异常描述',
      dataIndex: 'unusualdesc',
    },
    {
      title: '解决策略',
      dataIndex: 'solution',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: text => <span className={style[text]}>{status[text]}</span>
    }
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
  // previewItem = id => {
  //   router.push(`/profile/basic/${id}`);
  // };



  render() {
 const {data,onChange}=this.props;
    return (
      <Card
        title={<span className={styles.textprimarycolor}>设备异常信息</span>}
        className={styles.seconderycard}
        bordered={false}
      >
        <ShowTable
          data={data}
          columns={this.columns}
          onChange={onChange}
        />
      </Card>
    );
  }
}

export default UnusualInfo;
