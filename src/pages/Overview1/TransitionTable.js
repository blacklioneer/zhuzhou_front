import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Card,
  Form,
  Icon,
  message,
  Badge,
  Divider,
  Tag,
} from 'antd';
import ShowTable from '@/components/ShowTable';
import styles from './Overview.less';

const cstatus=[styles.textsecondery_run,styles.textsecondery_pause,styles.textsecondery_error];
// const statusMap = ['green', 'yellow', 'red'];
const status = ['正常', '缺料', '报警'];


@Form.create()
class TransitionTable extends PureComponent {
  columns = [
    {
      title: '设备号',
      dataIndex: 'name',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '待加工量',
      dataIndex: 'orderquantity',
    },
    {
      title: '已到坯量',
      dataIndex: 'materialquantity',
    },
    {
      title: '状态',
      dataIndex: 'status',
      // render: val => <Tag color={statusMap[val]}>{status[val]}</Tag>,
      render: val => <p className={cstatus[val]}>{status[val]}</p>,
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
    const{data,onChange}=this.props;
    return (
      <div style={{marginTop:'12px'}}>
        <Card
          title={<span className={styles.textprimarycolor}>物料配送</span>}
          className={styles.maincard}
          bordered={false}
        >
          <ShowTable
            data={data}
            columns={this.columns}
            onChange={onChange}
          />
        </Card>
      </div>
    );
  }
}

export default TransitionTable;
