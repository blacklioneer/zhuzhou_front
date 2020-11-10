import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Steps,
  Radio, Switch, Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';


import styles from './User.less';


const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
// const eid= ['','KD-33','KD-34','KD-35','KD-36','KD-37','KD-38','KD-39','KD-40','BP-11','BP-12','BP-13','BP-14','BP-15','BP-16','BP-17','BP-18'];
const eid= ['','KD-33','KD-34','KD-35','BP-11','BP-12','BP-13'];
/* const CreateForm = Form.create()(props => {

  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="oee录入"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem key="eid" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="选择设备">
        {form.getFieldDecorator('eid')(
          <Select style={{ width: '100%' }}>
            <Option value="1">KD-33</Option>
            <Option value="2">KD-34</Option>
            <Option value="3">KD-35</Option>
            <Option value="4">KD-36</Option>
            <Option value="5">KD-37</Option>
            <Option value="6">KD-38</Option>
            <Option value="7">KD-39</Option>
            <Option value="8">KD-40</Option>
            <Option value="9">BP-11</Option>
            <Option value="10">BP-12</Option>
            <Option value="11">BP-13</Option>
            <Option value="12">BP-14</Option>
            <Option value="13">BP-15</Option>
            <Option value="14">BP-16</Option>
            <Option value="15">BP-17</Option>
            <Option value="16">BP-18</Option>
          </Select>
        )}
      </FormItem>
    </Modal>
  );
}); */

@Form.create()
class UpdateEquipmentForm extends PureComponent {
  static defaultProps = {
    handleUpdateEquipment: () => {},
    handleUpdateEquipmentVisible: () => {}, /* 异常状态设置表是否可见 */
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        eid: props.values.eid,
        transmission: props.values.transmission,
        material: props.values.material,
      },
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = () => {
    const { form, handleUpdateEquipment } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          handleUpdateEquipment(formVals);
        }
      );
    });
  };

  renderContent = (formVals) => {
    const { form } = this.props;

    return [
      <FormItem key="transmission" {...this.formLayout} label="上料总量设置">
        {form.getFieldDecorator('transmission', )(<Input placeholder="请输入上料总量，输入后剩余棒料复原" />)}
      </FormItem>,
      <FormItem key="material" {...this.formLayout} label="剩余棒料量修正">
        {form.getFieldDecorator('material', )(<Input placeholder="若有误请输入(不输入不修改)！" />)}
      </FormItem>,
    ];
  };

  renderFooter = () => {
    const { handleUpdateEquipmentVisible, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleUpdateEquipmentVisible(false, values)}>
        取消
      </Button>,
      <Button key="submit" type="primary" onClick={() => this.handleNext()}>
        完成
      </Button>,
    ];
  };

  render() {
    const { equipmentmodalVisible, handleUpdateEquipmentVisible, values } = this.props;
    const { formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="物料配送设置"
        visible={equipmentmodalVisible}
        footer={this.renderFooter()}
        onCancel={() => handleUpdateEquipmentVisible(false, values)}
        afterClose={() => handleUpdateEquipmentVisible()}
      >
        {this.renderContent(formVals)}
      </Modal>
    );
  }
}
/* eslint react/no-multi-comp:0 */
@connect(({ transmissionsetting, loading }) => ({
  transmissionsetting,
  loading: loading.models.transmissionsetting,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    equipmentmodalVisible: false,
    selectedRows: [],
    formValues: {},
    equipmentFormValues: {},
  };

  columns = [
    {
      title: '设备名',
      dataIndex: 'eid',
      sorter:true,
    },
    {
      title: '订单剩余加工量',
      dataIndex: 'remain',
      sorter:true,
    },
    {
      title: '棒料剩余量',
      dataIndex: 'material',
      sorter:true,
    },
    {
      title: '上料总量',
      dataIndex: 'transmission',
    },
    // {
    //   title: '累计登录次数',
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   render: val => `${val}`,
    //   // mark to display a total number
    //   needTotal: true,
    // },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateEquipmentVisible(true, record)}>设置</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'transmissionsetting/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
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
      type: 'transmissionsetting/fetch',
      payload: params,
    });
  };


  /* handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'transmissionsetting/remove',
          payload: {
            id: selectedRows.map(row => row.id),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }; */

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };



  handleUpdateEquipment = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'transmissionsetting/update',
      payload: {
        query: formValues,
        body: {
          eid: fields.eid,
          material: fields.material,
          transmission: fields.transmission,
        },
      },
    });
    message.success('配置成功');
    this.handleUpdateEquipmentVisible();
  };

  handleUpdateEquipmentVisible = (flag, record) => {
    this.setState({
      equipmentmodalVisible: !!flag,
      equipmentFormValues: record || {},
    });
  };

/*  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'transmissionsetting/add',
      payload: {
        eid: fields.eid,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  }; */


  render() {
    const {
      transmissionsetting: { data },
      loading,
    } = this.props;
    const { selectedRows,equipmentmodalVisible,equipmentFormValues } = this.state;
    // const menu = (
    //   <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
    //     <Menu.Item key="remove">删除</Menu.Item>
    //   </Menu>
    // );

/*    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    }; */
    const updateEquipmentMethods = {
      handleUpdateEquipmentVisible: this.handleUpdateEquipmentVisible,
      handleUpdateEquipment: this.handleUpdateEquipment,
    };
    return (
      <PageHeaderWrapper title="物料配送管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        {/* <CreateForm {...parentMethods} modalVisible={modalVisible} /> */}
        {equipmentFormValues && Object.keys(equipmentFormValues).length ? (
          <UpdateEquipmentForm
            {...updateEquipmentMethods}
            equipmentmodalVisible={equipmentmodalVisible}
            values={equipmentFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
