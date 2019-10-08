import React, { PureComponent } from 'react';
import router from 'umi/router';
import {
  Card,
  Form,
} from 'antd';
import ShowTable from '@/components/ShowTable';
import styles from './Overview.less';

// const statusMap = ['default', 'processing', 'success', 'error'];
// const status = ['关闭', '运行中', '已上线', '异常'];


@Form.create()
class ProductTable extends PureComponent {
  columns = [
    {
      title: '设备号',
      dataIndex: 'name',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '订单号',
      dataIndex: 'ordernumber',
    },
    {
      title: '物料号',
      dataIndex: 'materialnumber',
    },
    {
      title: '订单数量',
      dataIndex: 'quantity',
    },
    {
      title: '已加工',
      dataIndex: 'finished',
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
          title={<span className={styles.textprimarycolor}>生产计划表</span>}
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

export default ProductTable;
