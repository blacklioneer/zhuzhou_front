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
  Divider,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Steps,
  Radio,
  Switch,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './User.less';


const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'success',];
const status = ['未监测', '正在监测', ];
const connectstatus = ['未连接', '已连接', ];
// const eid= ['','KD-33','KD-34','KD-35','KD-36','KD-37','KD-38','KD-39','KD-40','BP-11','BP-12','BP-13','BP-14','BP-15','BP-16','BP-17','BP-18'];
const run = [false,true];
const CreateForm = Form.create()(props => {
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
      title="新建连接"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem key="eid" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="连接设备">
        {form.getFieldDecorator('eid')(
          <Select style={{ width: '100%' }}>
            <Option value="1">KD-36</Option>
            <Option value="2">KD-43</Option>
            <Option value="3">KD-44</Option>
         {/*   <Option value="4">KD-36</Option>
            <Option value="5">KD-37</Option>
            <Option value="6">KD-38</Option>
            <Option value="7">KD-39</Option>
            <Option value="8">KD-40</Option> */}
            <Option value="4">BP-47</Option>
            <Option value="5">BP-48</Option>
            <Option value="6">KD-39</Option>
{/*            <Option value="12">BP-14</Option>
            <Option value="13">BP-15</Option>
            <Option value="14">BP-16</Option>
            <Option value="15">BP-17</Option>
            <Option value="16">BP-18</Option> */}
          </Select>
        )}
      </FormItem>,
    </Modal>
  );
});


@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        eid: props.values.eid,
        ip: props.values.ip,
      },
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = () => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          handleUpdate(formVals);
        }
      );
    });
  };

  renderContent = (formVals) => {
    const { form } = this.props;
      return [
        <FormItem key="ip" {...this.formLayout} label="ip地址">
          {form.getFieldDecorator('ip', {
            initialValue: formVals.ip,
          })(<Input placeholder="请输入" />)}
        </FormItem>,
      ];
  };

  renderFooter = () => {
    const { handleUpdateModalVisible, values } = this.props;
      return [
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext()}>
          完成
        </Button>,
      ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="ip设置"
        visible={updateModalVisible}
        footer={this.renderFooter()}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        {this.renderContent(formVals)}
      </Modal>
    );
  }
}


@Form.create()
class UpdateEquipmentForm extends PureComponent {
  static defaultProps = {
    handleUpdateEquipment: () => {},
    handleUpdateEquipmentVisible: () => {}, /* 加工状态设置表是否可见 */
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        eid: props.values.eid,
        status: props.values.status,
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
        <FormItem key="status" {...this.formLayout} label="监测设置">
          {form.getFieldDecorator('status',
            {initialValue:run[formVals.status], valuePropName: 'checked' })(<Switch />
          )}
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
        title="监测状态设置"
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
@connect(({ connectsetting, loading }) => ({
  connectsetting,
  loading: loading.models.connectsetting,
}))
@Form.create()
class TableList extends PureComponent {
  static defaultProps = {
    handleSwitchChange: () => {},

  };


  state = {
    modalVisible: false,
    equipmentmodalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    equipmentFormValues: {},
  };

  columns = [
    {
      title: '加工设备',
      dataIndex: 'eid',
      sorter:true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
    },
    {
      title: '监测状态',
      dataIndex: 'status',
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },

    {
      title: '连接状态',
      dataIndex: 'connection',
      render(val) {
        return <Badge status={statusMap[val]} text={connectstatus[val]} />;
      },
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>设置ip</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdateEquipmentVisible(true, record)}>监测状态</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'connectsetting/fetch',
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
      type: 'connectsetting/fetch',
      payload: params,
    });
  };


  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'connectsetting/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
      dispatch({
        type: 'connectsetting/remove',
        payload: {
          eid: selectedRows.map(row => row.eid),
        },
        callback: () => {
          this.setState({
            selectedRows: [],
          });
        },
        });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        login_time: fieldsValue.login_time && fieldsValue.login_time.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'connectsetting/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };


  handleUpdateEquipmentVisible = (flag, record) => {
    this.setState({
      equipmentmodalVisible: !!flag,
      equipmentFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'connectsetting/add',
      payload: {
        eid: fields.eid,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdateEquipment = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'connectsetting/updateequipment',
      payload: {
        query: formValues,
        body: {
          eid: fields.eid,
          status: fields.status,
        },
      },
    });

    message.success('配置成功');
    this.handleUpdateEquipmentVisible();
  };


  handleUpdate = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'connectsetting/update',
      payload: {
        query: formValues,
        body: {
          eid: fields.eid,
          ip: fields.ip,
        },
      },
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

/*  handleSwitchClick(){
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'connectsetting/updateequipment',
      payload: {
        query: formValues,
        body: {
          eid: fields.eid,
          status: fields.status,
        },
      },
    });

    message.success('配置成功');
    this.handleUpdateEquipmentVisible();
  }; */   //尝试修改switch开关失败




  render() {
    const {
      connectsetting: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues,equipmentmodalVisible,equipmentFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    const updateEquipmentMethods = {
      handleUpdateEquipmentVisible: this.handleUpdateEquipmentVisible,
      handleUpdateEquipment: this.handleUpdateEquipment,
    };
    return (
      <PageHeaderWrapper title="订单管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button icon="delete" type="primary" onClick={() => this.handleMenuClick()}>
                    删除
                  </Button>
                </span>
              )}
            </div>
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
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
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
